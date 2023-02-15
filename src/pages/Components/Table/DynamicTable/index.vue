<template>
  <div class="dynamicTableWrapper">
    <Table
      ref="tableRef"
      :columns="columns"
      :table-data-fetch="getRemote.getTableList"
      v-bind="props"
    >
      <template #config>
        <ConfigForm ref="configRef" />
      </template>
    </Table>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import Table from '@/components/Table/index.vue'
import ConfigForm from '../NotAssociated/config/index.vue'
import { createColumns } from './config'
import { getRemote } from '@/http'

const configRef = ref<typeof ConfigForm | null>(null)

const props = computed(() => configRef.value?.config)

const { tableRef, columns } = createColumns()
</script>

<style lang="scss" scoped></style>
