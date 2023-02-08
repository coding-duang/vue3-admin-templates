import { PropType } from 'vue'
import { dataTableProps } from 'naive-ui'

export const baseProps = {
  ...dataTableProps,
  title: {
    type: String,
    default: '',
  },
  storeId: {
    type: String,
    default: '',
  },
  cacheCondition: {
    type: Boolean,
    default: false,
  },
  cachePagination: {
    type: Boolean,
    default: false,
  },
}
