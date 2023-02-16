<template>
  <div class="chart-container">
    <div ref="chartsRef" class="chart-main"></div>
  </div>
</template>

<script lang="ts" setup>

// 散点（气泡）图
import { ref,   } from 'vue'
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
  xAxis: {},
  yAxis: {},
  series: [
    {
      symbolSize: 10,
      data: [
        [10.0, 8.04],
        [8.07, 6.95],
        [13.0, 7.58],
        [9.05, 8.81],
        [11.0, 8.33],
        [14.0, 7.66],
        [13.4, 6.81],
        [10.0, 6.33],
        [14.0, 8.96],
        [12.5, 6.82],
        [9.15, 7.2],
        [11.5, 7.2],
        [3.03, 4.23],
        [12.2, 7.83],
        [2.02, 4.47],
        [1.05, 3.33],
        [4.05, 4.96],
        [6.03, 7.24],
        [12.0, 6.26],
        [12.0, 8.84],
        [7.08, 5.82],
        [5.02, 5.68],
      ],
      type: 'scatter',
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
