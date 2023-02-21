<template>
  <n-form-item label="实验名称" path="name">
    <n-input
      v-model:value="modelReactive.name"
      placeholder="请输入名称"
      clearable
    ></n-input>
  </n-form-item>
  <n-form-item label="日期" path="date">
    <n-date-picker
      v-model:value="modelReactive.date"
      type="datetime"
      clearable
      value-format="yyyy-MM-dd HH:mm:ss"
    ></n-date-picker>
  </n-form-item>

  <n-form-item label="时间区间" path="timeArrange">
    <n-date-picker
      v-model:value="modelReactive.timeArrange"
      type="daterange"
      clearable
      value-format="yyyy-MM-dd HH:mm:ss"
    ></n-date-picker>
  </n-form-item>

  <n-form-item label="备注" path="remarks">
    <n-input
      type="textarea"
      placeholder="请输入备注"
      v-model:value="modelReactive.remarks"
      clearable
    ></n-input>
  </n-form-item>
</template>

<script lang="ts" setup>
import { inject, Ref } from 'vue'
import { ExperimentForm } from '../options'

const modelReactive = inject<Ref<ExperimentForm>>('modelReactive')
</script>
