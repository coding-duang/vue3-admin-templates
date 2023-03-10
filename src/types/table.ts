import { Component, Ref } from 'vue'
import {
  FormInst,
  ButtonProps,
  PaginationProps,
  DataTableInst,
  DialogOptions,
  DataTableColumn,
  DataTableColumns,
} from 'naive-ui'
import { Condition } from '@/hook/table/useCondition'
import { createDynamicStore, createDynamicPaginationStore } from '@/store'

export type TableComponent =
  typeof import('@/components/Table/index.vue')['default']

export type Pagination = PaginationProps

export type Fn = (...args: any[]) => void

export interface PopConfirm {
  title: string
  okText?: string
  cancelText?: string
  confirm: Fn
  cancel?: Fn
  icon?: Component
}

export type SetColumnsType = 'push' | 'unshift' | 'pop' | 'shift'
export type SetColumnsParamOptions = {
  start: number
  deleteCount: number
}

export type ActionItem = {
  auth?: string | string[]
  // 业务控制是否显示
  ifShow?: boolean | ((action: ActionItem) => boolean)
} & ButtonProps

export type Status = 0 | 1 | 2 | 3 | '' // 0: 已废弃  1: 已发布  2: 未发布  3: 其他

export type TableItem = {
  id?: number | undefined
  title?: string
  avatar?: string
  open?: boolean
  content?: string
  status?: Status
}

export type ActiveType = 'create' | 'edit' | 'inquiry' | 'delete'
export type ModalComponentProps = {
  tableItem?: Record<string, any>
  title?: string
  activeType?: ActiveType
  useDrawerFooter?: boolean
  [key: string]: any
}

export type CreateColumns<Column> = {
  tableRef: Ref<typeof import('../components/Table/index.vue')['default']>
  columns: DataTableColumns<Column>
  componentProps: Ref<ModalComponentProps>
  setColumns?: (
    column: DataTableColumn<Column>,
    type?: SetColumnsType,
    options?: SetColumnsParamOptions
  ) => void
}

export type TableApiResult = { list: TableItem[]; total: number }

export type TableExpose<M extends object> = {
  loading?: Ref<boolean>
  condition?: Ref<Partial<M>>
  conditionRef?: Ref<FormInst | null>
  validateForm?: (e: MouseEvent) => void
  resetModelReactive?: (model?: Partial<M>) => void
  fetchList?: () => Promise<void>
  openModal?: (type: ActiveType, dialogError?: DialogOptions) => void
  setModal?: (show: boolean) => boolean
  updatePage?: (page: number) => Promise<void>
  updatePageSize?: (pageSize: number) => Promise<void>
  setCondition?: (condition: Condition<Record<string, any>>) => void
  setPagination?: (_pagination: PaginationProps) => void
  searchByCondition?: <ConditionType extends object>(
    condition: Condition<ConditionType>
  ) => Promise<void>
  paginationStore?: ReturnType<ReturnType<typeof createDynamicPaginationStore>>
  conditionStore?: ReturnType<ReturnType<typeof createDynamicStore>>
}

export type TableInst<M extends object> = DataTableInst & TableExpose<M>
export type TableRef<M extends object> = Ref<TableInst<M> | null>
