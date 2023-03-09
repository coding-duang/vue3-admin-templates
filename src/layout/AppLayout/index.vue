<template>
  <div class="layoutWrapper">
    <n-layout has-sider>
      <AppSider v-if="getNavMode === 'vertical'" />
      <n-layout-header v-else>
        <AppHeader />
      </n-layout-header>
      <n-layout>
        <n-layout-header v-if="getNavMode === 'vertical'">
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
import { useProjectSetting } from '@/hook'

const { getNavMode } = useProjectSetting()
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
