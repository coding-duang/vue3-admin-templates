<template>
  <div class="chart-container">
    <div ref="chartsRef" class="chart-main"></div>
  </div>
</template>

<script lang="ts" setup>

// 仪表盘
import { ref, } from 'vue'
import defaultThemeColor from '@/config/theme/chart-colors'
import { useCharts } from "@/hook/charts";


const options = ref({
  color: defaultThemeColor,

  tooltip: {
    formatter: '{a} <br/>{b} : {c}%',
  },
  series: [
    {
      name: '仪表盘',
      type: 'gauge',
      radius: '100%',
      progress: {
        show: true,
      },
      detail: {
        valueAnimation: true,
        formatter: '{value}',
      },
      data: [{ value: 50, name: 'SCORE' }],
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
