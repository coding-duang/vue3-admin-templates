import { PaginationProps } from 'naive-ui'
import { TableItem } from '@/types'

export const componentSetting: {
  table: PaginationProps
  tableItem: TableItem
} = {
  table: {
    page: 1,
    pageCount: 1,
    itemCount: undefined as undefined,
    showQuickJumper: true,
    showSizePicker: true,
    pageSize: 10,
    pageSizes: [10, 20, 30, 40, 50],
  },
  tableItem: {
    id: undefined,
    title: '',
    avatar: '',
    open: false,
    status: '',
    content: '',
  },
}
