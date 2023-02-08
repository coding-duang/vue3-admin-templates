<template>

  <div class="chart-container">
    <div  ref="chartsRef" class="chart-main"></div>
  </div>

</template>

<script lang="ts" setup>
// TODO 使用 charts Hook
// 河流图
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import { EChartsType } from 'echarts/types/dist/echarts'
import defaultThemeColor from '@/config/theme/chart-colors'

const chartsRef = ref(null)
const options = ref({
  color: defaultThemeColor,

  tooltip: {
    trigger: 'axis' as 'axis',
    axisPointer: {
      type: 'line',
      lineStyle: {
        color: 'rgba(0,0,0,0.2)',
        width: 1,
      }
    }
  },
  singleAxis: {
    top: 50,
    bottom: 50,
    axisTick: {},
    axisLabel: {},
    type: 'time' as 'time',
    axisPointer: {
      animation: true,
      label: {
        show: true
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
        opacity: 0.2
      }
    }
  },
  series: [
    {
      name: '河流图',
      type: 'themeRiver',
      emphasis: {
        itemStyle: {
          shadowBlur: 20,
          shadowColor: 'rgba(0,0,0,0.8)'
        }
      },
      data: [
        ['2015/11/08', 10, 'DQ'],
        ['2015/11/09', 15, 'DQ'],
        ['2015/11/10', 35, 'DQ'],
        ['2015/11/11', 38, 'DQ'],
        ['2015/11/12', 22, 'DQ'],
        ['2015/11/13', 16, 'DQ'],
        ['2015/11/14', 7, 'DQ'],
        ['2015/11/15', 2, 'DQ'],
        ['2015/11/16', 17, 'DQ'],
        ['2015/11/17', 33, 'DQ'],
        ['2015/11/18', 40, 'DQ'],
        ['2015/11/19', 32, 'DQ'],
        ['2015/11/20', 26, 'DQ'],
        ['2015/11/21', 35, 'DQ'],
        ['2015/11/22', 40, 'DQ'],
        ['2015/11/23', 32, 'DQ'],
        ['2015/11/24', 26, 'DQ'],
        ['2015/11/25', 22, 'DQ'],
        ['2015/11/26', 16, 'DQ'],
        ['2015/11/27', 22, 'DQ'],
        ['2015/11/28', 10, 'DQ'],
        ['2015/11/08', 35, 'TY'],
        ['2015/11/09', 36, 'TY'],
        ['2015/11/10', 37, 'TY'],
        ['2015/11/11', 22, 'TY'],
        ['2015/11/12', 24, 'TY'],
        ['2015/11/13', 26, 'TY'],
        ['2015/11/14', 34, 'TY'],
        ['2015/11/15', 21, 'TY'],
        ['2015/11/16', 18, 'TY'],
        ['2015/11/17', 45, 'TY'],
        ['2015/11/18', 32, 'TY'],
        ['2015/11/19', 35, 'TY'],
        ['2015/11/20', 30, 'TY'],
        ['2015/11/21', 28, 'TY'],
        ['2015/11/22', 27, 'TY'],
        ['2015/11/23', 26, 'TY'],
        ['2015/11/24', 15, 'TY'],
        ['2015/11/25', 30, 'TY'],
        ['2015/11/26', 35, 'TY'],
        ['2015/11/27', 42, 'TY'],
        ['2015/11/28', 42, 'TY'],
        ['2015/11/08', 21, 'SS'],
        ['2015/11/09', 25, 'SS'],
        ['2015/11/10', 27, 'SS'],
        ['2015/11/11', 23, 'SS'],
        ['2015/11/12', 24, 'SS'],
        ['2015/11/13', 21, 'SS'],
        ['2015/11/14', 35, 'SS'],
        ['2015/11/15', 39, 'SS'],
        ['2015/11/16', 40, 'SS'],
        ['2015/11/17', 36, 'SS'],
        ['2015/11/18', 33, 'SS'],
        ['2015/11/19', 43, 'SS'],
        ['2015/11/20', 40, 'SS'],
        ['2015/11/21', 34, 'SS'],
        ['2015/11/22', 28, 'SS'],
        ['2015/11/23', 26, 'SS'],
        ['2015/11/24', 37, 'SS'],
        ['2015/11/25', 41, 'SS'],
        ['2015/11/26', 46, 'SS'],
        ['2015/11/27', 47, 'SS'],
        ['2015/11/28', 41, 'SS'],
        ['2015/11/08', 10, 'QG'],
        ['2015/11/09', 15, 'QG'],
        ['2015/11/10', 35, 'QG'],
        ['2015/11/11', 38, 'QG'],
        ['2015/11/12', 22, 'QG'],
        ['2015/11/13', 16, 'QG'],
        ['2015/11/14', 7, 'QG'],
        ['2015/11/15', 2, 'QG'],
        ['2015/11/16', 17, 'QG'],
        ['2015/11/17', 33, 'QG'],
        ['2015/11/18', 40, 'QG'],
        ['2015/11/19', 32, 'QG'],
        ['2015/11/20', 26, 'QG'],
        ['2015/11/21', 35, 'QG'],
        ['2015/11/22', 40, 'QG'],
        ['2015/11/23', 32, 'QG'],
        ['2015/11/24', 26, 'QG'],
        ['2015/11/25', 22, 'QG'],
        ['2015/11/26', 16, 'QG'],
        ['2015/11/27', 22, 'QG'],
        ['2015/11/28', 10, 'QG'],
        ['2015/11/08', 10, 'SY'],
        ['2015/11/09', 15, 'SY'],
        ['2015/11/10', 35, 'SY'],
        ['2015/11/11', 38, 'SY'],
        ['2015/11/12', 22, 'SY'],
        ['2015/11/13', 16, 'SY'],
        ['2015/11/14', 7, 'SY'],
        ['2015/11/15', 2, 'SY'],
        ['2015/11/16', 17, 'SY'],
        ['2015/11/17', 33, 'SY'],
        ['2015/11/18', 40, 'SY'],
        ['2015/11/19', 32, 'SY'],
        ['2015/11/20', 26, 'SY'],
        ['2015/11/21', 35, 'SY'],
        ['2015/11/22', 4, 'SY'],
        ['2015/11/23', 32, 'SY'],
        ['2015/11/24', 26, 'SY'],
        ['2015/11/25', 22, 'SY'],
        ['2015/11/26', 16, 'SY'],
        ['2015/11/27', 22, 'SY'],
        ['2015/11/28', 10, 'SY'],
        ['2015/11/08', 10, 'DD'],
        ['2015/11/09', 15, 'DD'],
        ['2015/11/10', 35, 'DD'],
        ['2015/11/11', 38, 'DD'],
        ['2015/11/12', 22, 'DD'],
        ['2015/11/13', 16, 'DD'],
        ['2015/11/14', 7, 'DD'],
        ['2015/11/15', 2, 'DD'],
        ['2015/11/16', 17, 'DD'],
        ['2015/11/17', 33, 'DD'],
        ['2015/11/18', 4, 'DD'],
        ['2015/11/19', 32, 'DD'],
        ['2015/11/20', 26, 'DD'],
        ['2015/11/21', 35, 'DD'],
        ['2015/11/22', 40, 'DD'],
        ['2015/11/23', 32, 'DD'],
        ['2015/11/24', 26, 'DD'],
        ['2015/11/25', 22, 'DD'],
        ['2015/11/26', 16, 'DD'],
        ['2015/11/27', 22, 'DD'],
        ['2015/11/28', 10, 'DD']
      ]
    }
  ]
})

let chartObj: EChartsType = null // 初始化后的对象

// 初始化 charts
const initCharts = () => {
  chartObj = echarts.init(chartsRef.value, null, {
    renderer: 'svg'
  })
  chartObj?.setOption(options.value as any)
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
