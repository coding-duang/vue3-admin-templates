import { ref } from 'vue'
import { createDynamicPaginationStore } from '@/store'
import { componentSetting } from '@/settings'
import { Pagination } from '@/types'
import { Options } from '../form'

const { table } = componentSetting

export const usePagination = (options?: Options) => {
  const { isCacheByPinia, storeId } = options

  const pagination = ref(table)

  const setPagination = (_pagination: Pagination) => {
    pagination.value = { ...pagination.value, ..._pagination }
  }

  const store = isCacheByPinia ? createDynamicPaginationStore(storeId)() : null

  return {
    store,
    pagination,
    setPagination,
  }
}
