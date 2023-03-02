import { fetchStandard } from '../standard'
import { Pagination, TableApiResult, TableItem } from '@/types'
import { Condition } from '@/hook'
import { AuthCondition } from '@/types/auth'

export class GetRemote {
  getTableList(params: Pagination & Condition<TableItem>) {
    return fetchStandard<Pagination & Condition<TableItem>, TableApiResult>({
      url: '/table',
      params,
    })
  }

  tableCreate(body: TableItem) {
    return fetchStandard<TableItem, any>({
      url: '/table/create',
      method: 'POST',
      data: body,
    })
  }

  tableDelete(body: TableItem) {
    const { id } = body
    return fetchStandard<TableItem, any>({
      url: '/table/delete',
      method: 'POST',
      data: { id },
    })
  }

  tableUpdate(body: TableItem) {
    return fetchStandard<TableItem, any>({
      url: '/table/update',
      method: 'POST',
      data: body,
    })
  }

  getOriginRoutes(body: AuthCondition) {
    return fetchStandard<AuthCondition, any>({
      url: '/auth/routes',
      method: 'POST',
      data: body,
    })
  }
}
