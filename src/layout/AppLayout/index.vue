<template>
  <div class="layoutWrapper">
    <n-layout has-sider>
      <AppSider />
      <n-layout>
        <n-layout-header>
          <AppHeader />
        </n-layout-header>
        <n-layout-content>
          <MainModule />
        </n-layout-content>
      </n-layout>
    </n-layout>
  </div>
</template>

<script lang="ts" setup>
import AppHeader from '../AppHeader/index.vue'
import AppSider from '../AppSider/index.vue'
import MainModule from './main.vue'
</script>

<style lang="scss" scoped>
.layoutWrapper {
  :deep(.n-layout) {
    height: 100vh;
  }
  :deep(.n-layout-header) {
    height: 60px;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1998;
    width: 100%;
  }
  :deep(.n-layout-content) {
    padding-top: 60px;
  }
}
</style>
