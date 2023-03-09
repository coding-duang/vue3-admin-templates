<script lang="tsx">
import { defineComponent } from 'vue'
import { props } from './props'
import { useHandleFileChange } from '@/hook'

export default defineComponent({
  name: 'BigfileUpload',
  props,
  setup(props) {
    const { fileRef, loading, progress, analogClick, fileChange } =
      useHandleFileChange(props)

    return () => (
      <div class="container">
        <div class="item">
          <h3>大文件上传</h3>
          <section class="upload_box" id="upload7">
            <input
              type="file"
              ref={fileRef}
              class="upload_inp"
              onChange={fileChange}
            />
            <div class="upload_button_box">
              <button
                class={[
                  'upload_button',
                  'select',
                  loading.value ? 'disable' : '',
                ]}
                onClick={analogClick}
              >
                上传图片
              </button>
            </div>
            {progress.value > 0 && (
              <div class="upload_progress">
                <div
                  class="value"
                  style={{ width: `${progress.value}%` }}
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
