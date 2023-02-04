<template>
  <n-layout-sider
    bordered
    collapse-mode="width"
    :collapsed-width="64"
    :width="280"
    :collapsed="collapsed"
    show-trigger
    @collapse="collapsed = true"
    @expand="collapsed = false"
  >
    <div class="logoWrapper">
      <n-icon :size="36" :component="LogoVue"></n-icon>
      <div v-show="!collapsed" class="title">Vue3 Admin Template</div>
    </div>
    <AppMenu :collapsed="collapsed" />
  </n-layout-sider>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { LogoVue } from '@vicons/ionicons5'
import AppMenu from '../AppMenu/index.vue'

const collapsed = ref(false)
</script>

<style lang="scss" scoped>
.logoWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0;
  .title {
    margin-left: 10px;
    display: inline-block;
    margin-left: 5px;
    overflow: hidden;
    font-size: 18px;
    line-height: 55px;
    color: #515a6e;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), color 0.1s,
      font-size 0s;
  }
}
</style>
