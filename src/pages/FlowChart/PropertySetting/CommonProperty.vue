<template>
  <div>
    <n-form label-width="80px" :model="formData">
      <n-form-item label="文案" path="text">
        <n-input v-model:value="formData.text"></n-input>
      </n-form-item>
      <n-form-item label="名称" path="name">
        <n-input v-model:value="formData.name"></n-input>
      </n-form-item>
      <n-form-item label="活动区域" path="region">
        <n-input v-model:value="formData.region"></n-input>
      </n-form-item>
      <n-form-item label="活动形式" path="type">
        <n-input v-model:value="formData.type"></n-input>
      </n-form-item>
      <n-form-item label="A">
        <n-input v-model:value="formData.a.a1"></n-input>
        <n-input v-model:value="formData.a.a2"></n-input>
      </n-form-item>
      <n-form-item>
        <n-button type="primary" @click="onSubmit">保存</n-button>
      </n-form-item>
    </n-form>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, onMounted, ref } from 'vue'
import type { LogicFlow, NodeData } from '@logicflow/core'

const props = defineProps<{
  lf: LogicFlow
  nodeData: NodeData
}>()

const emits = defineEmits<{
  (event: 'onClose'): void
}>()

const formData = ref({
  text: '666',
  name: '',
  region: '',
  type: '',
  a: {
    a1: '',
    a2: '',
  },
})

onMounted(() => {
  const { properties, text } = props.nodeData
  if (properties) {
    formData.value = Object.assign({}, formData.value, properties)
  }
  if (text && text.value) {
    formData.value.text = text.value
  }
})

const onSubmit = () => {
  const { id } = props.nodeData
  props.lf.setProperties(id, {
    ...formData.value,
  })
  props.lf.updateText(id, formData.value.text)
  emits('onClose')
}
</script>
<style scoped></style>
