<template>
  <div class="property-dialog">
    <User
      v-if="nodeData.type === 'user'"
      :nodeData="nodeData"
      :lf="lf"
      @onClose="handleClose"
    />
    <CommonProperty
      v-else
      :nodeData="nodeData"
      :lf="lf"
      @onClose="handleClose"
    />
  </div>
</template>
<script lang="ts" setup>
import CommonProperty from './CommonProperty.vue'
import User from './User.vue'
import { defineProps } from 'vue'
import type { LogicFlow, NodeData } from '@logicflow/core'
const props = defineProps<{
  lf: LogicFlow
  nodeData: NodeData
}>()

const emits = defineEmits<{
  (event: 'setPropertiesFinish'): void
}>()

const handleClose = () => {
  emits('setPropertiesFinish')
}
</script>
<style>
.property-dialog {
  padding: 20px;
}
</style>
