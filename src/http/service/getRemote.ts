import { fetchStandard } from '../standard'
import { Pagination, TableApiResult, TableItem } from '@/types'
import { Condition } from '@/hook'

export class GetRemote {
  getTableList(params: Pagination & Condition<TableItem>) {
    return fetchStandard<Pagination & Condition<TableItem>, TableApiResult>({
      url: '/table',
      params,
    })
  }
}
