<script lang="tsx">
import { ref, defineComponent } from 'vue'
import { fetchStandard } from '@/http/standard'
import SparkMD5 from 'spark-md5'
import { useMessage } from 'naive-ui'
import type { MessageReactive } from 'naive-ui'

export default defineComponent({
  name: 'BigfileUpload',
  props: {
    reconnecNumber: {
      type: Number,
      default: 3,
    },
    maxSize: {
      type: Number,
      default: 1,
    },
    maxCount: {
      type: Number,
      default: 100,
    },
  },
  setup(props) {
    const message = useMessage()
    const shortMessage = useMessage()
    const disable = ref(false)
    const processValue = ref(0)
    const fileDom = ref<HTMLInputElement | null>(null)
    let messageReactive: MessageReactive | null = null

    type ChunkFileList = {
      file: Blob
      index: number
    }[]

    const stateReset = () => {
      disable.value = false
      processValue.value = 0
    }

    const calculateHashByFilechunks = (chunks: ChunkFileList) => {
      return new Promise(resolve => {
        const spark = new SparkMD5.ArrayBuffer()
        let count = 0

        const appendToSpark = (file: Blob) => {
          return new Promise(resolve => {
            const reader = new FileReader()
            reader.readAsArrayBuffer(file)
            reader.onload = ev => {
              const buffer = ev.target.result
              spark.append(buffer as ArrayBuffer)
              resolve({})
            }
          })
        }

        const workLoop = async (deadline: IdleDeadline) => {
          if (count < chunks.length && deadline.timeRemaining() > 0) {
            await appendToSpark(chunks[count].file)
            count++
          }

          if (count === chunks.length) {
            resolve(spark.end())
          }

          window.requestIdleCallback(workLoop)
        }

        window.requestIdleCallback(workLoop)
      })
    }

    const createFileChunk = (file: File) => {
      let max = 1024 * 1024 * props.maxSize
      let count = Math.ceil(file.size / max)
      let index = 0
      const chunks: ChunkFileList = []

      if (count > props.maxCount) {
        max = file.size / props.maxCount
        count = props.maxCount
      }

      while (index < count) {
        chunks.push({
          file: file.slice(index * max, (index + 1) * max),
          index,
        })
        index++
      }

      return chunks
    }

    const fileChange = async () => {
      const file = fileDom.value.files[0]
      if (!file) return

      const suffix = /\.([a-zA-Z0-9]+)$/.exec(file.name)[1]
      messageReactive = message.loading('资源解析中', {
        duration: 0,
      })
      disable.value = true

      const chunkFileList = createFileChunk(file)
      const hash = await calculateHashByFilechunks(chunkFileList)

      if (messageReactive) {
        messageReactive.destroy()
        messageReactive = null
      }

      const newChunkFileList = chunkFileList.map(item => {
        return {
          file: item.file,
          key: item.index,
          filename: `${hash}_${item.index + 1}.${suffix}`,
        }
      })

      let alReady: Array<string> = []

      try {
        const data: any = await fetchStandard({
          method: 'get',
          url: 'http://127.0.0.1:8888/upload_already',
          params: { HASH: hash },
        })
        if (+data.code === 200) {
          alReady = data.fileList
        }
      } catch (error) {}

      const complate = async (index: number) => {
        index++
        processValue.value = index

        if (index < newChunkFileList.length) return
        processValue.value = 100

        try {
          const data: any = await fetchStandard({
            method: 'post',
            url: 'http://127.0.0.1:8888/upload_merge',
            data: { HASH: hash, count: newChunkFileList.length },
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          })
          if (+data.code === 200) {
            shortMessage.info(
              `恭喜您，文件上传成功，您可以基于 ${data.servicePath} 访问该文件~~`
            )
            stateReset()
            return
          }
        } catch (error) {
          shortMessage.error(`切片合并失败，请您稍后再试~~`)
          stateReset()
        }
      }

      const pool: Array<Promise<any>> = []
      let isBreak = false
      for (let i = 0; i < newChunkFileList.length; i++) {
        if (isBreak) break
        if (
          alReady.length > 0 &&
          alReady.includes(newChunkFileList[i].filename)
        ) {
          complate(i)
          continue
        }

        const fm = new FormData()
        fm.append('file', newChunkFileList[i].file)
        fm.append('filename', newChunkFileList[i].filename)

        const task = fetchStandard({
          method: 'post',
          url: 'http://127.0.0.1:8888/upload_chunk',
          data: fm,
        })

        task
          .then((data: any) => {
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
            shortMessage.error(`当前切片上传失败，请稍后再试~~2`)
            stateReset()
          })

        pool.push(task)

        if (pool.length >= 5) {
          try {
            await Promise.race(pool)
          } catch (error) {
            shortMessage.error(`当前切片上传失败，请稍后再试~~1`)
            stateReset()
            break
          }
        }
      }
      fileDom.value.value = ''
    }

    // 选择文件
    const selectFile = () => {
      if (disable.value) return
      fileDom.value.click()
    }

    return () => (
      <div class="container">
        <div class="item">
          <h3>大文件上传</h3>
          <section class="upload_box" id="upload7">
            <input
              type="file"
              ref={fileDom}
              class="upload_inp"
              onChange={fileChange}
            />
            <div class="upload_button_box">
              <button
                class={[
                  'upload_button',
                  'select',
                  disable.value ? 'disable' : '',
                ]}
                onClick={selectFile}
              >
                上传图片
              </button>
            </div>
            {processValue.value > 0 && (
              <div class="upload_progress">
                <div
                  class="value"
                  style={{ width: `${processValue.value}%` }}
                ></div>
              </div>
            )}
          </section>
        </div>
      </div>
    )
  },
})
</script>

<style lang="scss" scoped>
.container {
  padding: 20px 100px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.upload_box {
  position: relative;
  box-sizing: border-box;
  padding: 10px;
  width: 400px;
  min-height: 150px;
  border: 1px dashed #ddd;

  .upload_inp {
    display: none;
  }

  .upload_button {
    position: relative;
    box-sizing: border-box;
    margin-right: 10px;
    padding: 0 10px;
    min-width: 80px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: none;
    cursor: pointer;
    background-color: #ddd;
    overflow: hidden;
  }

  .upload_button:after {
    position: absolute;
    top: 30px;
    left: 0;
    z-index: 999;
    transition: top 0.1s;
    box-sizing: border-box;
    padding-left: 25px;
    width: 100%;
    height: 100%;
    content: 'loading...';
    text-align: left;
    background: url('./loading.gif') no-repeat 5px center #eee;
    background-size: 15px 15px;
    color: #999;
  }

  .upload_button.loading {
    cursor: inherit;
  }

  .upload_button.loading:after {
    top: 0;
  }

  .upload_button.select {
    background: #409eff;
    color: #fff;
  }

  .upload_button.upload {
    background: #67c23a;
    color: #fff;
  }

  .upload_button.disable {
    background: #eee;
    color: #999;
    cursor: inherit;
  }

  .upload_tip {
    margin-top: 10px;
    line-height: 25px;
    color: #999;
    font-size: 12px;
  }
  .upload_list {
    margin-top: 10px;
  }
  .upload_list li {
    line-height: 25px;
    font-size: 0;
  }

  .upload_list li span {
    display: inline-block;
    margin-right: 10px;
    max-width: 70%;
    color: #999;
    font-size: 12px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .upload_list li span em {
    padding: 0 5px;
    color: lightcoral;
    cursor: pointer;
    font-style: normal;
  }

  .upload_progress {
    position: relative;
    height: 5px;
    background: #eee;
    margin-top: 30px;
  }

  .upload_progress .value {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    height: 100%;
    width: 0%;
    background: #67c23a;
    transition: width 0.3s;
  }
  .upload_drag {
    height: 130px;
    position: relative;
  }

  .upload_drag .icon,
  .upload_drag .text {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .upload_drag .icon {
    top: 40%;
    width: 80px;
    height: 62px;
    background: url('upload.png') no-repeat;
    background-size: 100% 100%;
  }

  .upload_drag .text {
    top: 80%;
    line-height: 25px;
    color: #999;
    font-size: 12px;
  }

  .upload_drag .text a {
    color: #409eff;
  }
  .upload_mark {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    font-size: 12px;
    color: #fff;
    text-align: center;
    line-height: 150px;
  }
}
</style>
