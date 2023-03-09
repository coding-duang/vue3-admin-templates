<template>
  <ControlItem label="开启动画" v-model:value="value" />
  <ControlItem
    label="动画类型"
    :options="animates"
    v-model:value="animateType"
    :style="{ marginTop: '18px' }"
  />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useProjectSettingStore } from '@/store'
import { AnimateType, animates } from '@/settings'
import ControlItem from './ControlItem.vue'

const projectStore = useProjectSettingStore()

const { getIsPageAnimate, getPageAnimateType } = storeToRefs(projectStore)

const value = ref(getIsPageAnimate.value)
const animateType = ref<AnimateType>(getPageAnimateType.value)
watch(
  [() => value.value, () => animateType.value],
  ([isAnimate, animateType]) => {
    console.log(isAnimate, animateType)
    projectStore.setIsPageAnimate(isAnimate)
    projectStore.setPageAnimateType(animateType)
  }
)
</script>

<style lang="scss" scoped></style>
