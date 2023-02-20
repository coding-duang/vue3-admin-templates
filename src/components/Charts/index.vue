<template>
  <div class="chart-container">
    <div ref="chartRef" class="chart-main"></div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { useChart } from '@/hook'
import { ECOption } from '@/types'

const props = defineProps({
  options: {
    type: Object as PropType<ECOption>,
    required: true,
  },
})

const { chartRef } = useChart(props.options)
</script>

<style lang="scss" scoped>
.chart-container {
  min-width: 200px;
  max-width: 600px;
  width: 100%;
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  .chart-main {
    width: 100%;
    height: 100%;
  }
}
</style>
