import { useMessage } from 'naive-ui'
import { ref } from 'vue'
import type { MessageReactive } from 'naive-ui'
import { createFileChunks } from './createChunks'
import { calculateHashByFilechunks } from './calcHash'
import { props } from '@/components/BigfileUpload/props'
import type { Props } from './createChunks'
import { getAlreadyAPI, uploadChunkAPI, uploadMergeAPI } from './request'

type FileRef = HTMLInputElement | null

// type UploadInfo = {
//   fileRef: FileRef
//   disable: boolean
//   progress: number
// }

type ActiveType =
  | 'analysis'
  | 'success'
  | 'mergeError'
  | 'uploadError'
  | 'delete'

export const useHandleFileChange = (options: Props<typeof props>) => {
  const fileRef = ref<FileRef>(null)
  let messageReactive: MessageReactive | null = null
  const progress = ref(0)
  const loading = ref(false)
  const message = useMessage()

  const getFileSuffix = (fileName: string) => {
    return /\.([a-zA-Z0-9]+)$/.exec(fileName)[1]
  }

  const setLoading = (state: boolean) => {
    loading.value = state
  }

  const analogClick = () => {
    if (loading.value) return
    fileRef.value.click()
  }

  const operateMessage = (type: ActiveType) => {
    if (type === 'analysis') {
      messageReactive = message.loading('资源解析中', {
        duration: 0,
      })
    }
    if (type === 'success') {
      message.info('文件上传成功')
    }
    if (type === 'uploadError') {
      message.error('切片上传失败')
    }
    if (type === 'mergeError') {
      message.error('合并资源失败')
    }
    if (type === 'delete') {
      if (messageReactive) {
        messageReactive.destroy()
        messageReactive = null
      }
    }
  }

  const stateReset = () => {
    loading.value = false
    progress.value = 0
  }

  const getAlready = async (hash: string) => {
    try {
      const data = await getAlreadyAPI({ HASH: hash })
      if (+data.code === 200) {
        return data.fileList
      }
      return []
    } catch (error) {}
  }

  const fileChange = async () => {
    const file = fileRef.value.files[0]
    if (!file) return

    const suffix = getFileSuffix(file.name)
    const pool: Array<Promise<any>> = []
    let isBreak = false

    setLoading(true)
    operateMessage('analysis')

    const chunkFileList = createFileChunks(file, options)
    const hash = await calculateHashByFilechunks(chunkFileList)

    operateMessage('delete')

    const alReady = await getAlready(hash)

    const chunkFileListWithName = chunkFileList.map(item => {
      return {
        file: item.file,
        key: item.index,
        filename: `${hash}_${item.index + 1}.${suffix}`,
      }
    })

    const complate = async (index: number) => {
      index++
      progress.value = index

      if (index < chunkFileListWithName.length) return
      progress.value = 100

      try {
        const data = await uploadMergeAPI(
          `HASH=${hash}&count=${chunkFileListWithName.length}`
        )
        if (+data.code === 200) {
          operateMessage('success')
          stateReset()
        }
      } catch (error) {
        operateMessage('mergeError')
        stateReset()
      }
    }

    for (let i = 0; i < chunkFileListWithName.length; i++) {
      if (isBreak) break
      if (
        alReady.length > 0 &&
        alReady.includes(chunkFileListWithName[i].filename)
      ) {
        complate(i)
        continue
      }

      const fm = new FormData()
      fm.append('file', chunkFileListWithName[i].file)
      fm.append('filename', chunkFileListWithName[i].filename)

      const task = uploadChunkAPI(fm)

      task
        .then(data => {
          if (+data.code === 200) {
            const indexT = pool.findIndex(t => t === task)
            pool.splice(indexT)
            complate(i)
            return
          }
          return Promise.reject(data.codeText)
        })
        .catch(_error => {
          isBreak = true
          operateMessage('mergeError')
          stateReset()
        })

      pool.push(task)

      if (pool.length >= options.maxConnection) {
        try {
          await Promise.race(pool)
        } catch (error) {
          operateMessage('mergeError')
          stateReset()
          break
        }
      }
    }

    fileRef.value.value = ''
  }

  return {
    fileChange,
    fileRef,
    progress,
    loading,
    analogClick,
  }
}
