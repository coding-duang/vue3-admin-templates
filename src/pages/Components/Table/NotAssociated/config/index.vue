<template>
  <div class="configWrapper">
    <div class="item">
      <n-checkbox v-model:checked="modelReactive.striped">斑马纹</n-checkbox>
    </div>
    <div class="item">
      <n-checkbox v-model:checked="modelReactive.bordered">边框</n-checkbox>
    </div>
    <div class="item">
      <n-checkbox v-model:checked="modelReactive.selection">勾选行</n-checkbox>
    </div>
    <div class="item">
      <n-dropdown trigger="click" :options="options" @select="handleSelect">
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-icon size="22" class="icon">
              <FormatSizeOutlined />
            </n-icon>
          </template>
          表格密度
        </n-tooltip>
      </n-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { watch, PropType } from 'vue'
import { CreateColumns, TableItem } from '@/types'
import { useForm } from '@/hook'
import { FormatSizeOutlined } from '@vicons/material'

type Size = 'small' | 'medium' | 'large'
type Model = {
  striped: boolean
  bordered: boolean
  size: Size
  selection: boolean
}

const { modelReactive } = useForm<Model>({
  striped: false,
  bordered: false,
  size: 'medium',
  selection: false,
})

const options = [
  {
    key: 'small',
    label: '紧凑',
  },
  {
    key: 'medium',
    label: '正常',
  },
  {
    key: 'large',
    label: '宽松',
  },
]

const props = defineProps({
  setColumns: Function as PropType<CreateColumns<TableItem>['setColumns']>,
})

watch(
  () => modelReactive.value.selection,
  (newVal: boolean) => {
    const item = {
      type: 'selection',
    } as CreateColumns<TableItem>['columns'][number]
    newVal ? props.setColumns(item, 'unshift') : props.setColumns(item, 'shift')
  }
)

const handleSelect = (key: Size) => (modelReactive.value.size = key)

defineExpose({
  config: modelReactive.value,
})
</script>

<style lang="scss" scoped>
.configWrapper {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .item {
    min-width: 60px;
    padding: 15px;
    padding-top: 0;
    :deep(.icon) {
      cursor: pointer;
    }
  }
}
</style>
