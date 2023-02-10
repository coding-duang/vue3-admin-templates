<template>
  <div class="wrapper">
    <Table ref="tableRef" :columns="columns">
      <template #condition>
        <ConditionForm />
      </template>
    </Table>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { columns } from './config'
import Table from '@/components/Table/index.vue'
import ConditionForm from './NotAssociated/condition/index.vue'

const tableRef = ref<typeof Table>()
onMounted(() => {
  console.log(tableRef?.value)
})
</script>

<style lang="scss" scoped></style>
