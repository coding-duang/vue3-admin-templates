<template>
  <div class="wrapper">
    <n-data-table
      ref="tableRef"
      :data="tableList"
      :columns="columns"
      :loading="loading"
      :remote="true"
      :pagination="paginationRef"
      @update-page="updatePage"
      @update-page-size="updatePageSize"
    >
    </n-data-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, h, computed, unref } from 'vue'
import { getRemote } from '@/http'
import { TableItem } from '@/types'
import { baseProps } from './prop'
import {
  createTableContext,
  usePagination,
  useTableData,
  useCondition,
} from '@/hook'
import {
  NTag,
  DataTableColumns,
  NImage,
  NSwitch,
  NButton,
  DataTableInst,
} from 'naive-ui'

// 获取自定义以及表格的所有props合并
const props = defineProps(baseProps)

const tableRef = ref<DataTableInst | null>(null)
// 创建table上下文
createTableContext(tableRef)

const createColumns = (): DataTableColumns<TableItem> => {
  return [
    {
      title: '序号',
      key: 'id',
      width: 60,
      align: 'center',
    },
    {
      title: '标题',
      key: 'title',
      width: 200,
      align: 'center',
    },
    {
      title: '头像',
      key: 'avatar',
      width: 200,
      align: 'center',
      render: (rowData: TableItem) => {
        return h(NImage, { width: 60, height: 60, src: rowData.avatar })
      },
    },
    {
      title: '自我介绍',
      key: 'content',
      width: 280,
      align: 'center',
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: '状态',
      key: 'status',
      align: 'center',
      render: (rowData: TableItem) => {
        const { status } = rowData
        const obj: any = {}
        switch (status) {
          case 0:
            obj.type = 'error'
            obj.text = '已废弃'
            break
          case 1:
            obj.type = 'success'
            obj.text = '已发布'
            break
          case 2:
            obj.type = 'info'
            obj.text = '未发布'
            break
          case 3:
            obj.type = 'warning'
            obj.text = '其他'
            break
          default:
            break
        }
        return h(NTag, { type: obj.type }, { default: () => obj.text })
      },
    },
    {
      title: '是否大卖',
      key: 'open',
      align: 'center',
      width: 'auto',
      render: (rowData: TableItem) => {
        const onUpdateValue = (value: boolean) => {
          console.log(value)
          rowData.open = value
        }
        return h(
          NSwitch,
          { value: rowData.open, onUpdateValue },
          { checked: () => '开', unchecked: () => '关' }
        )
      },
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (rowData: TableItem) => {
        const handleEdit = () => {
          console.log('编辑了!', rowData)
        }
        const handleDetail = () => {
          console.log('详情!', rowData)
        }
        return h(
          'div',
          {
            class: 'btnGroup',
          },
          {
            default: () => [
              h(
                NButton,
                { type: 'info', onClick: handleEdit },
                { default: () => '编辑' }
              ),
              h(
                NButton,
                { type: 'success', onClick: handleDetail },
                { default: () => '详情' }
              ),
            ],
          }
        )
      },
    },
  ]
}
const columns = createColumns()

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

const { tableList, loading, updatePage, updatePageSize } = useTableData(
  getRemote.getTableList,
  params.value,
  {
    setPagination: props.cachePagination ? store?.setPagination : setPagination,
    setCondition: props.cacheCondition
      ? conditionStore?.setState
      : setCondition,
  }
)
</script>

<style lang="scss" scoped>
:deep(.btnGroup) {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
</style>
