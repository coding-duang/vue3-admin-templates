import { PaginationProps } from 'naive-ui'

export const componentSetting: { table: PaginationProps } = {
  table: {
    page: 1,
    pageCount: 1,
    itemCount: undefined as undefined,
    showQuickJumper: true,
    showSizePicker: true,
    pageSize: 10,
    pageSizes: [10, 20, 30, 40, 50],
  },
}
