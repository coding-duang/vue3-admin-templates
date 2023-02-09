import { defineStore } from 'pinia'
import { componentSetting } from '@/settings'
import { Pagination } from '@/types'

const {
  table: {
    page,
    itemCount,
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
      itemCount,
      pageSize,
      pageSizes,
      showQuickJumper,
      showSizePicker,
    }),
    getters: {
      getPagination: state => ({
        page: state.page,
        itemCount: state.itemCount,
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
      getItemCount: state => state.itemCount,
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
