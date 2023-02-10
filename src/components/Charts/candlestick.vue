<template>

  <div class="chart-container">
    <div  ref="chartsRef" class="chart-main"></div>
  </div>

</template>

<script lang="ts" setup>

// 蜡烛图 k线图
import { ref,  } from 'vue'

import defaultThemeColor from '@/config/theme/chart-colors'
import { useCharts } from "@/hook/charts"


const options = ref({
  color: defaultThemeColor,
  grid: {
    left: '10%',
    right: 10,
    top: 20,
    bottom: 20,
  },
  xAxis: {
    data: ['2017-10-24', '2017-10-25', '2017-10-26', '2017-10-27']
  },
  yAxis: {},
  series: [
    {
      type: 'candlestick',
      data: [
        [20, 34, 10, 38],
        [40, 35, 30, 50],
        [31, 38, 33, 44],
        [38, 15, 5, 42]
      ]
    }
  ]
})

const { chartDom : chartsRef } = useCharts(options.value);

</script>

<style lang="scss" scoped>

.chart-container{
  min-width: 200px;
  max-width: 600px;
  width: 100%;
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  .chart-main{
    width:100%;
    height: 100%;
  }
}
</style>
