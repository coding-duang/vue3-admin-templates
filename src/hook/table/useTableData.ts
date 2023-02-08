import { ref, onBeforeMount } from 'vue'
import { DataTableColumns } from 'naive-ui'
import { CustomResponse } from '@/http'
import { baseProps } from '@/components/Table/prop'
import { Pagination } from '@/types'

type ChangeEffect = {
  setPagination?: (pagination: Pagination) => void
}

export const useTableData = <Item, Params extends {}>(
  // columns: DataTableColumns<Item>,
  fetch: (...args: any[]) => Promise<CustomResponse>,
  params: Params,
  changeEffect: ChangeEffect
) => {
  const tableList = ref<Item[]>([])
  const loading = ref(false)

  const fetchList = async (_params = {}) => {
    try {
      _params = { ...params, ..._params }
      loading.value = true
      const {
        data: { list, total },
      } = await fetch(_params)
      tableList.value = list || []
      changeEffect?.setPagination({ itemCount: total })
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false
    }
  }

  const updatePage = async (page: number) => {
    changeEffect?.setPagination({ page })
    await fetchList({ ...params, page })
  }

  const updateSize = async (size: number) => {
    changeEffect?.setPagination({ pageSize: size })
    await fetchList({ ...params, pageSize: size })
  }

  onBeforeMount(async () => await fetchList())

  return {
    tableList,
    loading,
    fetchList,
    updatePage,
    updateSize,
  }
}
