<template>
  <n-drawer v-model:show="show" :default-width="360" v-bind="$attrs" resizable>
    <n-drawer-content title="主题配置" closable>
      <Title title="系统主题" />
      <ColorChoose />
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Title from './components/Title.vue'
import ColorChoose from './components/ColorChoose.vue'

const show = ref(false)
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
