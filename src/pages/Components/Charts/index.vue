<template>
  <div class="page-container">
    <n-grid :cols="3" :x-gap="18" :y-gap="12">
      <n-gi v-for="item in config" :key="item.title">
        <n-card
          :title="item.title"
          hoverable
          size="small"
          :segmented="{
            content: true,
          }"
        >
          <template #header>
            <n-skeleton v-if="loading" text width="60%" />
            <template v-else>{{ item.title }}</template>
          </template>
          <n-skeleton v-if="loading" height="80px" :repeat="2" />
          <Chart v-else :options="item.options" />
        </n-card>
      </n-gi>
    </n-grid>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useConfig } from './config'
import Chart from '@/components/Charts/index.vue'

const config = useConfig()
const loading = ref(true)

setTimeout(() => {
  loading.value = false
}, 2000)
</script>

<style lang="scss" scoped>
.page-container {
  padding: 20px;
  background: var(--theme-global-bg-color);
}
</style>
