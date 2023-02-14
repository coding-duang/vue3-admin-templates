import { ref, Ref } from 'vue'
import { storeToRefs } from 'pinia'
import { createDynamicPaginationStore } from '@/store'
import { componentSetting } from '@/settings'
import { Pagination } from '@/types'
import { Options } from '../form'

const { table } = componentSetting

export const usePagination = (options?: Options) => {
  const { isCacheByPinia, storeId } = options
  let store = null
  let pagination: Ref<Pagination>
  let setPagination: (_pagination: Pagination) => void

  if (isCacheByPinia) {
    store = createDynamicPaginationStore(storeId)()
    pagination = storeToRefs(store)?.getPagination
    setPagination = store.setPagination
  } else {
    pagination = ref(table)
    setPagination = (_pagination: Pagination) => {
      pagination.value = { ...pagination.value, ..._pagination }
    }
  }

  return {
    store,
    pagination,
    setPagination,
  }
}
