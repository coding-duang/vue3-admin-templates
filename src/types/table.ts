import { Component, Ref } from 'vue'
import {
  ButtonProps,
  PaginationProps,
  DataTableInst,
  DialogOptions,
} from 'naive-ui'
import { Condition } from '@/hook/table/useCondition'
import { createDynamicStore, createDynamicPaginationStore } from '@/store'

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

export type ActionItem = {
  auth?: string | string[]
  // 业务控制是否显示
  ifShow?: boolean | ((action: ActionItem) => boolean)
} & ButtonProps

export type Status = 0 | 1 | 2 | 3 | '' // 0: 已废弃  1: 已发布  2: 未发布  3: 其他

export type TableItem = {
  id: number | undefined
  title: string
  avatar: string
  open: boolean
  content: string
  status: Status
}

export type ActiveType = 'create' | 'edit' | 'inquiry' | 'delete'
export type ModalComponentProps = {
  tableItem?: Record<string, any>
  title?: string
  activeType?: ActiveType
}

export type TableApiResult = { list: TableItem[]; total: number }

export type TableExpose = {
  loading?: Ref<boolean>
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

export type TableInst = DataTableInst & TableExpose
export type TableRef = Ref<TableInst | null>
