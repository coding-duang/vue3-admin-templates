import { provide, inject, ref } from 'vue'
import { TableRef, TableExpose, TableInst } from '@/types'

export const createTableContext = <M extends object>(
  SupplementaryContext: TableExpose<M> = {}
) => {
  const tableContext: TableRef<M> = ref(null)
  const context = Object.assign({ tableContext }, SupplementaryContext)

  provide<Partial<TableInst<M>>>('tableContext', context)
  return context
}

export const useTableContext = <M extends object>() =>
  inject<Partial<TableInst<M>>>('tableContext')
