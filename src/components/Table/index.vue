<template>
  <div class="wrapper">
    <div class="slotArea">
      <slot name="condition" :tableRef="tableRef"></slot>
      <slot name="config" :tableRef="tableRef"></slot>
    </div>
    <n-data-table
      ref="tableRef"
      :data="tableList"
      :columns="columns"
      :loading="loading"
      :remote="true"
      v-bind="$attrs"
      :pagination="paginationRef"
      @update-page="updatePage"
      @update-page-size="updatePageSize"
    >
    </n-data-table>

    <n-drawer v-model:show="showModal" v-bind="drawerAttrs">
      <n-drawer-content :title="modalComponentProps?.title || ''" closable>
        <component :is="modalComponent" v-bind="modalComponentProps" />
        <template #footer>
          <slot name="modalFooter"></slot>
        </template>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script lang="ts" setup>
import { computed, unref } from 'vue'
import { getRemote } from '@/http'
import { baseProps } from './prop'
import {
  createTableContext,
  usePagination,
  useTableData,
  useCondition,
  useTableModal,
  Condition,
} from '@/hook'

// 获取自定义以及表格的所有props合并
const props = defineProps(baseProps)

// 初始化表格的crud弹出框逻辑
const { showModal, openModal, setModal } = useTableModal(props)
// 初始并逻辑化表格的查询条件
// （isCacheByPinia：代表你是否要全局缓存条件， storeId：代表你要创建的pinia的store ID）
const {
  store: conditionStore,
  condition,
  setCondition,
} = useCondition(props.condition, {
  isCacheByPinia: props.cacheCondition,
  storeId: props.storeId,
})

// 初始并逻辑化分页器数据
// （isCacheByPinia：代表你是否要全局缓存页码， storeId：代表你要创建的pinia的store ID）
const { store, setPagination, pagination } = usePagination({
  isCacheByPinia: props.cachePagination,
  storeId: props.storeId,
})

// 计算出最终使用的pagination
const paginationRef = computed(() =>
  props.cachePagination ? unref(store?.getPagination) : unref(pagination)
)

// 计算出最终请求表格数据时传给后端的参数
const params = computed(() => {
  const currentCondition = props.cacheCondition
    ? unref(conditionStore.getState)
    : condition

  const paginationParams = paginationRef.value && {
    page: paginationRef.value.page,
    pageSize: paginationRef.value.pageSize,
  }
  return { ...paginationParams, ...currentCondition }
})

const {
  tableList,
  loading,
  fetchList,
  updatePage,
  updatePageSize,
  searchByCondition,
} = useTableData(getRemote.getTableList, params.value, {
  setPagination: props.cachePagination ? store?.setPagination : setPagination,
  setCondition: props.cacheCondition
    ? (conditionStore?.setState as (
        condition: Condition<Record<string, any>>
      ) => void)
    : setCondition,
})

// 创建table上下文
const exposed = {
  loading,
  fetchList,
  openModal,
  setModal,
  updatePage,
  updatePageSize,
  setCondition,
  setPagination,
  conditionStore,
  searchByCondition,
  paginationStore: store,
}
const tableRef = createTableContext(exposed)
// 同时暴露出去组件组合逻辑方法
defineExpose(exposed)
</script>

<style lang="scss" scoped>
:deep(.btnGroup) {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
</style>
