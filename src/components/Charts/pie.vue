<template>
  <div class="chart-container">
    <div ref="chartsRef" class="chart-main"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref,   } from 'vue'

import defaultThemeColor from '@/config/theme/chart-colors'
type TriggerOptions = 'item' | 'axis' | 'none'
import { useCharts } from "@/hook/charts";

const options = ref({
  color: defaultThemeColor,
  tooltip: {
    trigger: 'item' as TriggerOptions,
  },
  grid: {
    left: 5,
    right: 5,
    top: 5,
    bottom: 5,
  },

  series: [
    {
      name: '销量',
      type: 'pie',
      labelLine: {
        show: false,
      },
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 14,
          fontWeight: 'bold',
        },
      },
      radius: ['40%', '70%'],
      itemStyle: {
        borderRadius: 6,
        borderColor: '#fff',
        borderWidth: 2,
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' },
      ],
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
