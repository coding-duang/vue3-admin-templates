import { ref, Ref, unref } from 'vue'
import { DataTableColumns } from 'naive-ui'
import { CreateColumns } from '@/types'

export type ColumnItem = {
  id: number | string
  name: string
  job: string
}

type Result<Column> = Partial<
  CreateColumns<Column> & { tableData: ColumnItem[] }
>

export const createColumns = <Column extends object>(): Result<Column> => {
  const columns = ref<DataTableColumns<Column>>([
    {
      title: '序号',
      key: 'id',
      width: 60,
      align: 'center',
    },
    {
      title: '姓名',
      key: 'name',
      width: 200,
      align: 'center',
    },
    {
      title: '职业',
      key: 'job',
      width: 200,
      align: 'center',
    },
  ])
  const tableData: ColumnItem[] = [
    {
      id: 1,
      name: '科比',
      job: '得分后卫 / 小前锋',
    },
    {
      id: 2,
      name: '麦迪',
      job: '得分后卫 / 小前锋',
    },
    {
      id: 3,
      name: '詹姆斯',
      job: '小前锋 / 大前锋',
    },
    {
      id: 4,
      name: '艾弗森',
      job: '组织后卫 / 得分后卫',
    },
    {
      id: 5,
      name: '邓肯',
      job: '大前锋 / 中锋',
    },
  ]

  return {
    tableData,
    columns: unref(columns),
  }
}
