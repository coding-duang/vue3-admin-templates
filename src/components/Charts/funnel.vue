<template>
  <div class="chart-container">
    <div ref="chartsRef" class="chart-main"></div>
  </div>
</template>

<script lang="ts" setup>

import { ref  } from 'vue'
import defaultThemeColor from '@/config/theme/chart-colors'
import { useCharts } from "@/hook/charts";


const options = ref({
  color: defaultThemeColor,

  tooltip: {
    trigger: 'item' as 'item',
    formatter: '{a} <br/>{b} : {c}%',
  },

  series: [
    {
      name: '漏斗图',
      type: 'funnel',
      left: '10%',
      top: 0,
      bottom: 0,
      width: '80%',
      min: 0,
      max: 100,
      minSize: '0%',
      maxSize: '100%',
      sort: 'descending',
      gap: 2,
      label: {
        show: true,
        position: 'right',
      },
      labelLine: {
        length: 10,
        lineStyle: {
          width: 1,
          type: 'solid',
        },
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 1,
      },
      emphasis: {
        label: {
          fontSize: 14,
        },
      },
      data: [
        { value: 60, name: '访问' },
        { value: 40, name: '咨询' },
        { value: 20, name: '订单' },
        { value: 80, name: '点击' },
        { value: 100, name: '展现' },
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
