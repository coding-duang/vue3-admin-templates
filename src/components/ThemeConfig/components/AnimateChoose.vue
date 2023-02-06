<template>
  <ControlItem label="关闭动画" v-model:value="value" />
  <ControlItem
    label="动画类型"
    :options="animates"
    v-model:value="animateType"
    :style="{ marginTop: '18px' }"
  />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useProjectSettingStore } from '@/store'
import { AnimateType, animates } from '@/settings'
import ControlItem from './ControlItem.vue'

const projectStore = useProjectSettingStore()

const value = ref(projectStore.getIsPageAnimate)
const animateType = ref<AnimateType>(projectStore.getPageAnimateType)
watch(
  [() => value.value, () => animateType.value],
  ([isAnimate, animateType]) => {
    projectStore.setIsPageAnimate(isAnimate)
    projectStore.setPageAnimateType(animateType)
  }
)
</script>

<style lang="scss" scoped></style>
