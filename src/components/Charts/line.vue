<template>
  <div class="chart-container">
    <div ref="chartsRef" class="chart-main"></div>
  </div>
</template>

<script lang="ts" setup>

import { ref } from 'vue'
import defaultThemeColor from '@/config/theme/chart-colors'
import { useCharts } from "@/hook/charts";


const options = ref({
  color: defaultThemeColor,
  grid: {
    left: '10%',
    right: 10,
    top: 20,
    bottom: 20,
  },
  xAxis: {
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'line',
      data: [5, 20, 36, 10, 10, 20, 33],
    },
  ],
})

const { chartDom : chartsRef } = useCharts(options.value);
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
