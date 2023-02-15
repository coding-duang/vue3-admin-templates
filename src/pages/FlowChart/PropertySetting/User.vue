<template>
  <div>
    <n-form ref="form" :model="form" label-width="80px">
      <n-form-item label="活动名称">
        <n-input v-model="form.name"></n-input>
      </n-form-item>
      <n-form-item label="活动区域">
        <n-select
          v-model="form.region"
          placeholder="请选择活动区域"
          :options="regionOptions"
        />
      </n-form-item>
      <n-form-item label="活动时间">
        <n-col :span="11">
          <n-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.date1"
            style="width: 100%"
          ></n-date-picker>
        </n-col>
        <n-col class="line" :span="2">-</n-col>
        <n-col :span="11">
          <n-time-picker
            placeholder="选择时间"
            v-model="form.date2"
            style="width: 100%"
          ></n-time-picker>
        </n-col>
      </n-form-item>
      <n-form-item label="即时配送">
        <n-switch v-model="form.delivery"></n-switch>
      </n-form-item>
      <n-form-item label="活动性质">
        <n-checkbox-group v-model="form.type">
          <n-checkbox label="美食/餐厅线上活动" name="type"></n-checkbox>
          <n-checkbox label="地推活动" name="type"></n-checkbox>
          <n-checkbox label="线下主题活动" name="type"></n-checkbox>
          <n-checkbox label="单纯品牌曝光" name="type"></n-checkbox>
        </n-checkbox-group>
      </n-form-item>
      <n-form-item label="特殊资源">
        <n-radio-group v-model="form.resource">
          <n-radio label="线上品牌商赞助"></n-radio>
          <n-radio label="线下场地免费"></n-radio>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="活动形式">
        <n-input type="textarea" v-model="form.desc"></n-input>
      </n-form-item>
      <n-form-item>
        <n-button type="primary" @click="onSubmit">保存</n-button>
      </n-form-item>
    </n-form>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import type { LogicFlow, NodeData } from '@logicflow/core'
const props = defineProps<{
  lf: LogicFlow
  nodeData: NodeData
}>()

const emits = defineEmits<{
  (event: 'onClose'): void
}>()

const regionOptions = [
  {
    label: '区域一',
    value: 'shanghai',
  },
  {
    label: '区域二',
    value: 'beijing',
  },
]
let form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})
onMounted(() => {
  const { properties } = props.nodeData
  if (properties) {
    form = Object.assign({}, form, properties)
  }
})

const onSubmit = () => {
  const nodeData = props.nodeData
  nodeData.properties = form
  props.lf.setProperties(nodeData.id, form)
  emits('onClose')
}
</script>
<style scoped></style>
