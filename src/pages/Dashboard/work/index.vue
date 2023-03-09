<template>
  <div class="workWrapper">
    <WorkTable />
    <Mine />
  </div>
</template>

<script lang="ts" setup>
import { WorkTable } from './components/WorkTable'
import Mine from './components/Mine/index.vue'
</script>

<style lang="scss" scoped>
.workWrapper {
  padding: 20px;
  background-color: var(--theme-global-bg-color);
}
</style>
