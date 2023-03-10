import { ref, Ref, h, unref } from 'vue'
import {
  DataTableColumns,
  NImage,
  NTag,
  NGradientText,
  DataTableColumn,
} from 'naive-ui'
import {
  CreateColumns,
  ModalComponentProps,
  TableItem,
  TableComponent,
  SetColumnsType,
} from '@/types'

export const createColumns = <Column>(): CreateColumns<Column> => {
  const tableRef = ref<TableComponent | null>(null)
  const componentProps: Ref<ModalComponentProps> = ref({})

  const columns = ref<DataTableColumns<Column>>([
    {
      title: '序号',
      key: 'id',
      width: 60,
      align: 'center',
    },
    {
      title: '标题',
      key: 'title',
      width: 200,
      align: 'center',
    },
    {
      title: '头像',
      key: 'avatar',
      width: 200,
      align: 'center',
      render: (rowData: TableItem) => {
        return h(NImage, { width: 60, height: 60, src: rowData.avatar })
      },
    },
    {
      title: '自我介绍',
      key: 'content',
      width: 350,
      align: 'center',
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: '状态',
      key: 'status',
      align: 'center',
      render: (rowData: TableItem) => {
        const { status } = rowData
        const obj: any = {}
        switch (status) {
          case 0:
            obj.type = 'error'
            obj.text = '已废弃'
            break
          case 1:
            obj.type = 'success'
            obj.text = '已发布'
            break
          case 2:
            obj.type = 'info'
            obj.text = '未发布'
            break
          case 3:
            obj.type = 'warning'
            obj.text = '其他'
            break
          default:
            break
        }
        return h(NTag, { type: obj.type }, { default: () => obj.text })
      },
    },
    {
      title: '是否大卖',
      key: 'open',
      align: 'center',
      width: 'auto',
      render: (rowData: TableItem) => {
        return h(
          NGradientText,
          { type: rowData.open ? 'primary' : 'error' },
          { default: () => (rowData.open ? '是' : '否') }
        )
      },
    },
  ])

  const setColumns = (
    columnItem: DataTableColumn<Column>,
    type: SetColumnsType = 'push'
  ) => {
    switch (type) {
      case 'push':
      case 'unshift':
      case 'pop':
      case 'shift':
        columns.value[type](columnItem)
        break
      default:
        break
    }
  }

  return {
    tableRef,
    columns: unref(columns),
    componentProps,
    setColumns,
  }
}
