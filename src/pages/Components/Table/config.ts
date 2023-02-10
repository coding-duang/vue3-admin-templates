import { h, Ref } from 'vue'
import { TableItem } from '@/types'
import { NTag, DataTableColumns, NImage, NSwitch, NButton } from 'naive-ui'

export const createColumns = (): DataTableColumns<TableItem> => {
  return [
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
          // openModal()
          console.log('编辑了!', rowData)
        }
        const handleDetail = () => {
          console.log('详情!', rowData)
        }
        return h(
          'div',
          {
            class: 'btnGroup',
          },
          {
            default: () => [
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
            ],
          }
        )
      },
    },
  ]
}
export const columns = createColumns()
