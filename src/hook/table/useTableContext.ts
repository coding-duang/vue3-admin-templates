import { provide, inject, Ref } from 'vue'
import { DataTableInst } from 'naive-ui'

export type TableRef = Ref<DataTableInst | null>

export const createTableContext = (tableRef: TableRef) =>
  provide<TableRef>('tableContext', tableRef)

export const useTableContext = () => inject<TableRef>('tableContext')
