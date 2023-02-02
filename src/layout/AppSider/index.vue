<template>
  <n-layout-sider
    bordered
    collapse-mode="width"
    :collapsed-width="78"
    :width="240"
    :collapsed="collapsed"
    show-trigger
    @collapse="collapsed = true"
    @expand="collapsed = false"
  >
    <AppMenu />
  </n-layout-sider>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import AppMenu from '../AppMenu/index.vue'

const collapsed = ref(false)
</script>

<style lang="scss" scoped>
// @import './index.scss';
</style>
