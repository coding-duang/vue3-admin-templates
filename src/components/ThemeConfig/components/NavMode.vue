<template>
  <ControlItem
    label="导航模式"
    checked-value="horizontal"
    unchecked-value="vertical"
    v-model:value="mode"
  >
    <template #switchChecked> 横向 </template>
    <template #switchUnchecked> 纵向 </template>
  </ControlItem>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useProjectSetting } from '@/hook'
import ControlItem from './ControlItem.vue'

const { getNavMode, projectSettingStore } = useProjectSetting()

const mode = computed({
  get() {
    return getNavMode.value
  },
  set(v) {
    projectSettingStore.setNavMode(v)
  },
})
</script>

<style lang="scss" scoped></style>
