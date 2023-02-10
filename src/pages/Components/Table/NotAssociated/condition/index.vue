<template>
  <div class="conditionWrapper">
    <n-form
      ref="formRef"
      inline
      label-placement="left"
      label-width="auto"
      :model="modelReactive"
    >
      <n-form-item label="标题" path="title">
        <n-input v-model:value="modelReactive.title" placeholder="请输入标题" />
      </n-form-item>

      <n-form-item label="状态" path="status">
        <n-select
          v-model:value="modelReactive.status"
          placeholder="请选择状态"
          :options="selectOptions"
          clearable
        />
      </n-form-item>

      <n-form-item label="开关" path="open">
        <n-switch v-model:value="modelReactive.open" />
      </n-form-item>

      <n-form-item>
        <n-button type="success" @click="search"> 搜索 </n-button>
        <n-button type="error" @click="reset"> 重置 </n-button>
      </n-form-item>
    </n-form>
  </div>
</template>

<script lang="ts" setup>
import { useForm, useTableContext } from '@/hook'
import { TableItem } from '@/types'

const tableContext = useTableContext()
const selectOptions = [
  {
    label: '已废弃',
    value: 0,
  },
  {
    label: '已发布',
    value: 1,
  },
  {
    label: '未发布',
    value: 2,
  },
  {
    label: '其他',
    value: 3,
  },
]

const { formRef, modelReactive, resetModelReactive } = useForm<TableItem>({
  title: '',
  status: 1,
  open: false,
})

const search = () => tableContext.searchByCondition(modelReactive)

const reset = () => {
  resetModelReactive()
  tableContext.searchByCondition(modelReactive)
}
</script>

<style lang="scss" scoped></style>
