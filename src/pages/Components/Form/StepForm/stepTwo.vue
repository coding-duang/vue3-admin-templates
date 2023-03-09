<template>
  <n-form-item label="迁移类型" path="migrationType">
    <n-checkbox-group v-model:value="modelReactive.migrationType">
      <n-space>
        <n-checkbox
          v-for="migration in migrationOptions"
          :key="migration.value"
          :value="migration.value"
        >
          {{ migration.label }}
        </n-checkbox>
      </n-space>
    </n-checkbox-group>
  </n-form-item>

  <n-form-item label="业务用户名" path="business">
    <n-input
      v-model:value="modelReactive.business"
      placeholder="请输入用户名"
      clearable
    ></n-input>
  </n-form-item>

  <n-form-item label="保存时间" path="saveTime">
    <n-date-picker
      v-model:value="modelReactive.saveTime"
      type="datetime"
      clearable
      placeholder="请选择"
      value-format="yyyy-MM-dd HH:mm:ss"
    ></n-date-picker>
  </n-form-item>

  <n-form-item label="其他类型" path="otherType">
    <n-checkbox-group v-model:value="modelReactive.otherType">
      <n-space>
        <n-checkbox
          v-for="other in otherOptions"
          :key="other.value"
          :value="other.value"
        >
          {{ other.label }}
        </n-checkbox>
      </n-space>
    </n-checkbox-group>
  </n-form-item>
</template>

<script lang="ts" setup>
import { inject, Ref } from 'vue'
import { ExperimentForm, migrationOptions, otherOptions } from '../options'

const modelReactive = inject<Ref<ExperimentForm>>('modelReactive')
</script>
