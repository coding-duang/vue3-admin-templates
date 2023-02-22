import { h, Ref, ref } from 'vue'
import { getRemote } from '@/http'
import { TableItem, ModalComponentProps, TableComponent } from '@/types'
import { NTag, DataTableColumns, NImage, NSwitch, NButton } from 'naive-ui'

export const createColumns = <Item>(): {
  tableRef: Ref<TableComponent | null>
  columns: DataTableColumns<Item>
  componentProps: Ref<ModalComponentProps>
} => {
  const tableRef = ref<TableComponent | null>(null)
  const componentProps: Ref<ModalComponentProps> = ref({})
  const loading = ref(false)
  const columns = [
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
      width: 280,
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
        const onUpdateValue = (value: boolean) => {
          console.log(value)
          rowData.open = value
        }
        return h(
          NSwitch,
          { value: rowData.open, onUpdateValue },
          { checked: () => '开', unchecked: () => '关' }
        )
      },
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (rowData: TableItem) => {
        const handleEdit = () => {
          tableRef.value?.openModal('edit')
          componentProps.value = {
            tableItem: rowData,
            activeType: 'edit',
          }
        }
        const handleDetail = () => {
          tableRef.value?.openModal('inquiry')
          componentProps.value = {
            tableItem: rowData,
            activeType: 'inquiry',
          }
        }
        const handleDelete = () => {
          tableRef.value?.openModal('delete', {
            title: '删除',
            content: `是否确认删除${rowData.title}?`,
            positiveText: '确认',
            loading: loading.value,
            positiveButtonProps: { type: 'error' },
            onPositiveClick: async () => {
              loading.value = true
              await getRemote.tableDelete(rowData)
              loading.value = false
              await tableRef.value.fetchList()
            },
          })
        }
        return [
          h(
            NButton,
            { type: 'info', onClick: handleEdit },
            { default: () => '编辑' }
          ),
          h(
            NButton,
            { type: 'success', onClick: handleDetail },
            { default: () => '详情' }
          ),
          h(
            NButton,
            { type: 'error', onClick: handleDelete },
            { default: () => '删除' }
          ),
        ]
      },
    },
  ]

  return {
    tableRef,
    columns: columns as DataTableColumns<Item>,
    componentProps,
  }
}
