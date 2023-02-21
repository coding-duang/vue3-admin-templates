<template>
  <div class="dynamicTableWrapper">
    <Table
      ref="tableRef"
      :columns="columns"
      :table-data-fetch="getRemote.getTableList"
      :row-key="rowKey"
      @update-checked-row-keys="handleCheck"
      v-bind="props"
    >
      <template #config>
        <ConfigForm ref="configRef" :setColumns="setColumns" />
      </template>
    </Table>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { DataTableRowKey, useMessage } from 'naive-ui'
import Table from '@/components/Table/index.vue'
import ConfigForm from '../NotAssociated/config/index.vue'
import { createColumns } from './config'
import { getRemote } from '@/http'
import { TableItem } from '@/types'

const message = useMessage()
const configRef = ref<typeof ConfigForm | null>(null)

const checkedRowKeysRef = ref<DataTableRowKey[]>([])

const handleCheck = (rowKeys: DataTableRowKey[]) =>
  (checkedRowKeysRef.value = rowKeys)

watch(
  () => checkedRowKeysRef.value,
  (newVal: DataTableRowKey[]) => {
    console.log(newVal)
    message.info(newVal.join(','))
  }
)

const props = computed(() => configRef.value?.config)

const rowKey = (row: TableItem) => row.id

const { tableRef, columns, setColumns } = createColumns<TableItem>()
</script>

<style lang="scss" scoped></style>
