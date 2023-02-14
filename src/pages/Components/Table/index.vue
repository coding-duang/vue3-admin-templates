<template>
  <div class="wrapper">
    <Table
      ref="tableRef"
      :condition="condition"
      :cache-pagination="true"
      :columns="columns"
      :table-data-fetch="getRemote.getTableList"
      :modal-component="TableForm"
      :modal-component-props="componentProps"
    >
      <template #condition>
        <ConditionForm />
      </template>

      <template #modalFooter>
        <n-button type="primary">确定</n-button>
      </template>
    </Table>
  </div>
</template>

<script lang="ts" setup>
import { TableItem } from '@/types'
import { createColumns } from './config'
import Table from '@/components/Table/index.vue'
import ConditionForm from './NotAssociated/condition/index.vue'
import TableForm from './NotAssociated/crud/TableForm.vue'
import { getRemote } from '@/http'

const { tableRef, columns, componentProps } = createColumns<TableItem>()
const condition = {
  title: '',
  status: 1,
  open: false,
}
</script>

<style lang="scss" scoped></style>
