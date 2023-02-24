<template>
  <div class="download-wrap">
    <n-alert> 根据后台接口文件流下载 </n-alert>
    <n-button type="primary" class="btn" @click="handleDownByData">
      文件流下载
    </n-button>

    <n-alert>根据文件地址下载文件</n-alert>
    <n-button type="primary" class="btn" @click="handleDownloadByUrl">
      文件地址下载
    </n-button>

    <n-alert>base64流下载</n-alert>
    <n-button type="primary" class="btn" @click="handleDownloadByBase64">
      base64流下载
    </n-button>

    <n-alert>图片Url下载,如果有跨域问题，需要处理图片跨域</n-alert>
    <n-button type="primary" class="btn" @click="handleDownloadByOnlineUrl">
      图片Url下载
    </n-button>
  </div>
</template>

<script setup lang="ts">
import {
  downloadByUrl,
  downloadByData,
  downloadByBase64,
  downloadByOnlineUrl,
} from '@/utils/file/download'
import imgBase64 from './imgBase64'
const handleDownByData = () => {
  downloadByData('text content', 'testName.txt')
}

const handleDownloadByUrl = () => {
  downloadByUrl({
    url: 'https://github.com/vbenjs/vue-vben-admin/archive/refs/tags/v2.8.0.zip',
    // url: 'https://vdn6.vzuu.com/HD/d704fe7c-76c5-11ed-a5c1-c2e42a4bb920-v8_f1_t1_P73nfk6z.mp4?pkey=AAXugzipslsvtT62cd-O7QiEyU9gD8DJe-_827_WtYx2RmgbipOZkCBNaDrBuSyzvKwZMCiJarsM4urNz2f0ST32&c=avc.8.0&f=mp4&pu=1513c7c2&bu=http-1513c7c2&expiration=1677063206&v=ks6&pf=Web&pt=ks',
    target: '_self',
  })
}

const handleDownloadByBase64 = () => {
  downloadByBase64(imgBase64, 'logo.png')
}

const handleDownloadByOnlineUrl = () => {
  downloadByOnlineUrl(
    'https://p3-passport.byteimg.com/img/mosaic-legacy/3796/2975850990~180x180.awebp',
    'logo.png'
  )
}
</script>

<style lang="scss" scoped>
.download-wrap {
  padding: 30px;
  .btn {
    margin: 30px 0;
  }
}
</style>
