<template>
  <div class="conditionWrapper">
    <n-form
      ref="formRef"
      inline
      label-placement="left"
      label-width="auto"
      :model="condition"
    >
      <n-grid :cols="24" :x-gap="24">
        <n-form-item-gi :span="4">
          <n-button type="primary" @click="create">创建</n-button>
        </n-form-item-gi>

        <n-form-item-gi :span="4" label="标题" path="title">
          <n-input v-model:value="condition.title" placeholder="请输入标题" />
        </n-form-item-gi>

        <n-form-item-gi :span="4" label="状态" path="status">
          <n-select
            v-model:value="condition.status"
            placeholder="请选择状态"
            :options="selectOptions"
            clearable
          />
        </n-form-item-gi>

        <n-form-item-gi :span="2" label="开关" path="open">
          <n-switch v-model:value="condition.open" />
        </n-form-item-gi>

        <n-form-item-gi :span="6">
          <n-button
            type="info"
            @click="search"
            :style="{ marginRight: '10px' }"
          >
            搜索
          </n-button>
          <n-button type="error" @click="reset"> 重置 </n-button>
        </n-form-item-gi>
      </n-grid>
    </n-form>
  </div>
</template>

<script lang="ts" setup>
import { useTableContext } from '@/hook'
import { TableItem } from '@/types'

const tableContext = useTableContext<TableItem>()
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

const formRef = tableContext.conditionRef
const condition = tableContext.condition
const resetModelReactive = tableContext.resetModelReactive

const search = () => tableContext.searchByCondition(condition)

const reset = () => {
  resetModelReactive()
  search()
}

const create = () => tableContext.openModal('create')
</script>

<style lang="scss" scoped></style>
