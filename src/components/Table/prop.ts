import { PropType, Component } from 'vue'
import { dataTableProps, DataTableProps, DrawerProps } from 'naive-ui'
import { ModalComponentProps } from '@/types'
import { computeHeight } from './util'

type CustomProps = {
  title: {
    type: StringConstructor
    default: string
  }
  tableDataFetch: {
    type: PropType<(...args: any[]) => Promise<any>>
    required: boolean
  }
  storeId: {
    type: StringConstructor
    default: string
  }
  condition: {
    type: ObjectConstructor
    default: () => {}
  }
  cacheCondition: {
    type: BooleanConstructor
    default: boolean
  }
  cachePagination: {
    type: BooleanConstructor
    default: boolean
  }
  modalComponent: {
    type: PropType<Component>
    default: () => {}
  }
  modalComponentProps: {
    type: PropType<ModalComponentProps>
    default: () => ModalComponentProps
  }
  drawerAttrs: {
    type: PropType<DrawerProps>
    default: () => DrawerProps
  }
}

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

type TargetProps = typeof baseProps

export const filterProps = (
  targetProps: any,
  slotRef: HTMLDivElement | null
) => {
  const props: DataTableProps = {} as DataTableProps
  const height = computeHeight(slotRef)
  Object.keys(targetProps).forEach((key: keyof TargetProps) => {
    // eslint-disable-next-line no-prototype-builtins
    if (dataTableProps.hasOwnProperty(key)) {
      if (key === 'maxHeight') {
        props[key] = targetProps[key] || height
      } else {
        // @ts-ignore
        props[key] = targetProps[key]
      }
    }
  })
  return props
}
