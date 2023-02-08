import { defineStore, storeToRefs } from 'pinia'
import { componentSetting } from '@/settings'
import { Pagination } from '@/types'

const {
  table: {
    page,
    pageSizes,
    pageSize,
    pageCount,
    showQuickJumper,
    showSizePicker,
  },
} = componentSetting

export const createDynamicPaginationStore = (pageId: string) => {
  return defineStore(`${pageId}_pagination`, {
    state: (): Pagination => ({
      page,
      pageCount,
      pageSize,
      pageSizes,
      showQuickJumper,
      showSizePicker,
    }),
    getters: {
      getPagination: state => ({
        page: state.page,
        pageCount: state.pageCount,
        pageSize: state.pageSize,
        pageSizes: state.pageSizes,
        showQuickJumper: state.showQuickJumper,
        showSizePicker: state.showSizePicker,
      }),
      getPage: state => state.page,
      getPageCount: state => state.pageCount,
      getPageSize: state => state.pageSize,
      getPageSizes: state => state.pageSizes,
      getShowQuickJumper: state => state.showQuickJumper,
      getShowSizePicker: state => state.showSizePicker,
    },
    actions: {
      setPagination(pagination: Pagination) {
        console.log(this.state)
        Object.keys(pagination).forEach((key: keyof Pagination) => {
          console.log(this.state, pagination, key)

          this.state[key] = pagination[key]
        })
      },
    },
  })
}
