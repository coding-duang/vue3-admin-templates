<template>
  <div class="wrapper">
    <div class="slotArea" ref="slotAreaRef">
      <slot name="condition" :tableRef="tableRef"></slot>
      <slot name="config" :tableRef="tableRef"></slot>
    </div>
    <n-data-table
      v-bind="filterProps(props, slotAreaRef)"
      ref="tableRef"
      :data="tableList"
      :columns="columns"
      :loading="loading"
      :remote="true"
      :pagination="pagination"
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
import { computed, unref, ref } from 'vue'
import { baseProps, filterProps } from './prop'
import {
  createTableContext,
  usePagination,
  useTableData,
  useCondition,
  useTableModal,
  Condition,
} from '@/hook'

const slotAreaRef = ref<HTMLDivElement | null>(null)

// 获取自定义以及表格的所有props合并
const props = defineProps(baseProps)
// 初始化表格的crud弹出框逻辑
const { showModal, openModal, setModal } = useTableModal(props)
// 初始并逻辑化表格的查询条件
// （isCacheByPinia：代表你是否要全局缓存条件， storeId：代表你要创建的pinia的store ID）
const {
  formRef: conditionRef,
  store: conditionStore,
  condition,
  setCondition,
  validateForm,
  resetModelReactive,
} = useCondition<typeof props.condition>(props.condition, {
  isCacheByPinia: props.cacheCondition,
  storeId: props.storeId,
})

// 初始并逻辑化分页器数据
// （isCacheByPinia：代表你是否要全局缓存页码， storeId：代表你要创建的pinia的store ID）
const { store, setPagination, pagination } = usePagination({
  isCacheByPinia: props.cachePagination,
  storeId: props.storeId,
})

// 计算出最终请求表格数据时传给后端的参数
const params = computed(() => {
  const currentCondition = props.cacheCondition
    ? unref(conditionStore.getState)
    : unref(condition)

  const paginationParams = {
    page: pagination.value.page,
    pageSize: pagination.value.pageSize,
  }
  console.log(props.cacheCondition, currentCondition)
  return { ...paginationParams, ...currentCondition }
})

const {
  tableList,
  loading,
  fetchList,
  updatePage,
  updatePageSize,
  searchByCondition,
} = useTableData(props.tableDataFetch, params, {
  setPagination,
  setCondition,
})

// 创建table上下文
const exposed = {
  loading,
  fetchList,
  openModal,
  setModal,
  updatePage,
  updatePageSize,
  conditionRef,
  condition,
  validateForm,
  resetModelReactive,
  setCondition,
  setPagination,
  conditionStore,
  searchByCondition,
  paginationStore: store,
}

const tableRef = createTableContext<typeof props.condition>(exposed)
// 同时暴露出去组件组合逻辑方法
defineExpose(exposed)
</script>

<style lang="scss" scoped>
:deep(.btnGroup) {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
.wrapper {
  background-color: var(--n-color);
  padding: 15px;
}
</style>
