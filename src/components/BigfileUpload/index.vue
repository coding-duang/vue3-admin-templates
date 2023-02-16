<script lang="tsx">
import { ref, defineComponent } from 'vue'
import { fetchStandard } from '@/http/standard'
import SparkMD5 from 'spark-md5'
import { useMessage } from 'naive-ui'

type UploadList = Array<{
  file: File
  filename: string
  key: string
}>

type BufferPromise = {
  buffer: FileReader['result']
  HASH: string
  suffix: string
  filename: string
}

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
    const disable = ref(false)
    const processValue = ref(0)
    const fileDom = ref<HTMLInputElement | null>(null)

    const fileToBuffer = (file: File): Promise<BufferPromise> => {
      return new Promise(resolve => {
        const fileReader = new FileReader()
        fileReader.readAsArrayBuffer(file)

        fileReader.onload = ev => {
          const buffer = ev.target.result
          const spark = new SparkMD5.ArrayBuffer()
          spark.append(buffer as ArrayBuffer)
          const HASH = spark.end()
          const suffix = /\.([a-zA-Z0-9]+)$/.exec(file.name)[1]

          resolve({
            buffer,
            HASH,
            suffix,
            filename: `${HASH}.${suffix}`,
          })
        }
      })
    }

    const fileChange = async () => {
      const file = fileDom.value.files[0]
      if (!file) return

      message.loading('资源解析中', {
        duration: 0,
      })
      disable.value = true

      let alReady: Array<string> = []

      const { HASH, suffix } = await fileToBuffer(file)

      try {
        const data: any = await fetchStandard({
          method: 'get',
          url: 'http://127.0.0.1:8888/upload_already',
          params: { HASH },
        })

        if (+data.code === 200) {
          alReady = data.fileList
        }
      } catch (error) {}

      let max = 1024 * 1024 * props.maxSize
      let count = Math.ceil(file.size / max)
      let index = 0
      const chunks: Array<{ file: Blob; filename: string }> = []

      if (count > props.maxCount) {
        max = file.size / props.maxCount
        count = props.maxCount
      }

      while (index < count) {
        chunks.push({
          file: file.slice(index * max, (index + 1) * max),
          filename: `${HASH}_${index + 1}.${suffix}`,
        })
        index++
      }

      index = 0

      const complate = async () => {
        index++
        processValue.value = index

        if (index < count) return
        processValue.value = 100

        try {
          const data: any = await fetchStandard({
            method: 'post',
            url: 'http://127.0.0.1:8888/upload_merge',
            data: { HASH, count },
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          })
          if (+data.code === 200) {
            alert(
              `恭喜您，文件上传成功，您可以基于 ${data.servicePath} 访问该文件~~`
            )
            disable.value = false
            processValue.value = 0
            return
          }
        } catch (error) {
          alert('切片合并失败，请您稍后再试~~')
          disable.value = false
          processValue.value = 0
        }
      }

      chunks.forEach(async chunk => {
        const currentConnectCount = 0

        if (alReady.length > 0 && alReady.includes(chunk.filename)) {
          complate()
          return
        }

        const fm = new FormData()
        fm.append('file', chunk.file)
        fm.append('filename', chunk.filename)

        const uploadPipe = async () => {
          try {
            const data: any = await fetchStandard({
              method: 'post',
              url: 'http://127.0.0.1:8888/upload_chunk',
              data: fm,
            })
            if (+data.code === 200) {
              complate()
              return
            }
            return Promise.reject(data.codeText)
          } catch (error) {
            if (currentConnectCount < props.reconnecNumber) {
              // 需要给个正在重新上传的文案
              uploadPipe()
            } else {
              alert('当前切片上传失败，请您稍后再试~~')
              disable.value = false
            }
          }
        }
        await uploadPipe()
      })

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

  .upload_abbre,
  .upload_box .upload_progress {
    margin-top: 10px;
  }
  .upload_abbre img {
    display: block;
    width: 100%;
  }

  .upload_progress {
    position: relative;
    height: 5px;
    background: #eee;
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
