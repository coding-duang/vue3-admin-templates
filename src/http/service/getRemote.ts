import { fetchStandard } from '../standard'
import { Pagination } from '@/types'

export class GetRemote {
  getTableList(params: Pagination) {
    return fetchStandard({ url: '/table', params })
  }
}
