<template>
  <n-form-item label="部署单元" path="deploy">
    <n-checkbox-group v-model:value="modelReactive.deploy">
      <n-space>
        <n-checkbox
          v-for="deploy in deployOptions"
          :key="deploy.value"
          :value="deploy.value"
        >
          {{ deploy.label }}
        </n-checkbox>
      </n-space>
    </n-checkbox-group>
  </n-form-item>

  <n-form-item label="部署策略" path="strategies">
    <n-select
      v-model:value="modelReactive.strategies"
      :options="strategiesOptions"
      placeholder="请选择部署策略"
    ></n-select>
  </n-form-item>
</template>

<script lang="ts" setup>
import { inject, Ref } from 'vue'
import { ExperimentForm, strategiesOptions, deployOptions } from '../options'

const modelReactive = inject<Ref<ExperimentForm>>('modelReactive')
</script>
