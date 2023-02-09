import { Component } from 'vue'
import { ButtonProps, PaginationProps } from 'naive-ui'

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

export type Status = 0 | 1 | 2 | 3 // 0: 已废弃  1: 已发布  2: 未发布  3: 其他

export type TableItem = {
  id: number
  title: string
  avatar: string
  open: boolean
  content: string
  status: Status
}
