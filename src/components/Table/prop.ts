import { PropType, Component } from 'vue'
import { dataTableProps, DrawerProps } from 'naive-ui'
import { ModalComponentProps } from '@/types'

// type CustomColumns = TableColumns<any> | ((...args: any[]) => TableColumns<any>)

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
  condition: {
    type: Object,
    default: () => ({}),
  },
  cacheCondition: {
    type: Boolean,
    default: false,
  },
  cachePagination: {
    type: Boolean,
    default: false,
  },
  modalComponent: {
    type: Object as PropType<Component>,
    default: () => ({}),
  },
  modalComponentProps: {
    type: Object as PropType<ModalComponentProps>,
    default: (): ModalComponentProps => ({}),
  },
  drawerAttrs: {
    type: Object as PropType<DrawerProps>,
    default: (): DrawerProps => ({
      width: '60%',
      placement: 'right',
      resizable: true,
    }),
  },
}
