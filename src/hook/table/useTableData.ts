import { Ref, ref, onBeforeMount, ComputedRef } from 'vue'
import { CustomResponse } from '@/http'
import { Pagination, TableApiResult } from '@/types'
import { Condition } from './useCondition'
import { componentSetting } from '@/settings'

type ChangeEffect = {
  setPagination?: (pagination: Pagination) => void
  setCondition?: <S extends object>(
    condition: S
  ) =>
    | void
    | (<ConditionType extends object>(
        condition: Condition<ConditionType>
      ) => void)
}

export const useTableData = <Item, Params extends Object>(
  fetch: (...args: any[]) => Promise<CustomResponse<TableApiResult>>,
  fetchParams: ComputedRef<Params>,
  changeEffect: ChangeEffect
) => {
  const tableList: Ref<Item[]> = ref([])
  const loading = ref(false)

  const fetchList = async () => {
    try {
      loading.value = true
      const {
        data: { list, total },
      } = await fetch(fetchParams.value)

      tableList.value = list as Item[]
      changeEffect.setPagination({ itemCount: total })
    } catch (error) {
      throw new Error(error)
    } finally {
      loading.value = false
    }
  }

  const updatePage = async (page: number) => {
    changeEffect.setPagination({ page })
    await fetchList()
  }

  const updatePageSize = async (pageSize: number) => {
    changeEffect.setPagination({ pageSize })
    await fetchList()
  }

  const searchByCondition = async <ConditionType extends object>(
    condition: Condition<ConditionType>
  ) => {
    const { table } = componentSetting
    changeEffect.setPagination({ page: table.page, pageSize: table.pageSize })
    changeEffect.setCondition(condition)
    await fetchList()
  }

  onBeforeMount(() => fetchList())

  return {
    tableList,
    loading,
    fetchList,
    updatePage,
    updatePageSize,
    searchByCondition,
  }
}
