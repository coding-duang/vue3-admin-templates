import { provide, inject, ref } from 'vue'
import { TableRef, TableExpose, TableInst } from '@/types'

export const createTableContext = (SupplementaryContext: TableExpose = {}) => {
  const tableContext: TableRef = ref(null)
  const context = {
    tableRef: tableContext,
    ...SupplementaryContext,
  }
  provide<Partial<TableInst>>('tableContext', context)
  return context
}

export const useTableContext = () => inject<Partial<TableInst>>('tableContext')
