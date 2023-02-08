<template>
  <div class="chart-container">
    <div ref="chartsRef" class="chart-main"></div>
  </div>
</template>

<script lang="ts" setup>
// TODO 使用 charts Hook
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import { EChartsType } from 'echarts'
import defaultThemeColor from '@/config/theme/chart-colors'

const chartsRef = ref(null)
const options = ref({
  color: defaultThemeColor,
  grid: {
    left: '10%',
    right: 10,
    top: 20,
    bottom: 20,
  },
  series: [
    {
      type: 'treemap',
      data: [
        {
          name: 'nodeA',
          value: 10,
          children: [
            {
              name: 'nodeAa',
              value: 4,
            },
            {
              name: 'nodeAb',
              value: 6,
            },
          ],
        },
        {
          name: 'nodeB',
          value: 20,
          children: [
            {
              name: 'nodeBa',
              value: 20,
              children: [
                {
                  name: 'nodeBa1',
                  value: 20,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
})

let chartObj: EChartsType = null // 初始化后的对象

// 初始化 charts
const initCharts = () => {
  chartObj = echarts.init(chartsRef.value, null, {
    renderer: 'svg',
  })
  chartObj?.setOption(options.value)
}

const resizeChangeHandle = () => {
  chartObj?.resize()
}

onBeforeUnmount(() => {
  chartObj?.dispose()
  window?.removeEventListener('resize', resizeChangeHandle)
})

onMounted(() => {
  initCharts()
  window?.addEventListener('resize', resizeChangeHandle)
})
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
