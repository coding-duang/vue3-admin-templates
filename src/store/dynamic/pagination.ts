import { defineStore, storeToRefs } from 'pinia'
import { componentSetting } from '@/settings'
import { Pagination } from '@/types'

const {
  table: {
    page,
    pageSizes,
    pageSize,
    pageCount,
    itemCount,
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
      itemCount,
      pageSizes,
      showQuickJumper,
      showSizePicker,
    }),
    getters: {
      getPagination: state => ({
        page: state.page,
        pageCount: state.pageCount,
        pageSize: state.pageSize,
        itemCount: state.itemCount,
        pageSizes: state.pageSizes,
        showQuickJumper: state.showQuickJumper,
        showSizePicker: state.showSizePicker,
      }),
      getPage: state => state.page,
      getPageCount: state => state.pageCount,
      getItemCount: state => state.itemCount,
      getPageSize: state => state.pageSize,
      getPageSizes: state => state.pageSizes,
      getShowQuickJumper: state => state.showQuickJumper,
      getShowSizePicker: state => state.showSizePicker,
    },
    actions: {
      setPagination(pagination: Pagination) {
        Object.keys(pagination).forEach((key: keyof Pagination) => {
          this.$state[key] = pagination[key]
        })
      },
    },
  })
}
