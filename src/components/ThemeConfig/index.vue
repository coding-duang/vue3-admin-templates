<template>
  <n-drawer v-model:show="show" :default-width="360" v-bind="$attrs" resizable>
    <n-drawer-content title="主题配置" closable>
      <Title title="主题模式" />
      <SubjectMode />

      <Title title="系统主题颜色" />
      <ColorChoose />
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Title from './components/Title.vue'
import SubjectMode from './components/subjectMode.vue'
import ColorChoose from './components/ColorChoose.vue'

const show = ref(false)
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
