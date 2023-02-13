import { PropType, Component } from 'vue'
import { dataTableProps, DrawerProps } from 'naive-ui'
import { ModalComponentProps } from '@/types'

// type CustomColumns = TableColumns<any> | ((...args: any[]) => TableColumns<any>)

export const baseProps = {
  // n-data-table的自己属性
  ...dataTableProps,
  // 表格的大标题
  title: {
    type: String,
    default: '',
  },
  // 自定义传入的请求接口（增删改查api）
  tableDataFetch: {
    type: Function as PropType<(...args: any[]) => Promise<any>>,
    required: true,
  },
  // 缓存给到pinia的id
  storeId: {
    type: String,
    default: '',
  },
  // 表格的综合查询条件
  condition: {
    type: Object,
    default: () => ({}),
  },
  // 是否缓存查询条件
  cacheCondition: {
    type: Boolean,
    default: false,
  },
  // 是否缓存分页
  cachePagination: {
    type: Boolean,
    default: false,
  },
  // 编辑，详情查看，创建的时候传入的自定义组件（如表单，其他自定义的组件）
  modalComponent: {
    type: Object as PropType<Component>,
    default: () => ({}),
  },
  // modalComponent组件传入的props，类型是ModalComponentProps
  modalComponentProps: {
    type: Object as PropType<ModalComponentProps>,
    default: (): ModalComponentProps => ({}),
  },
  // n-drawer组件的属性，同naive-ui一样的属性
  drawerAttrs: {
    type: Object as PropType<DrawerProps>,
    default: (): DrawerProps => ({
      width: '60%',
      placement: 'right',
      resizable: true,
    }),
  },
}
