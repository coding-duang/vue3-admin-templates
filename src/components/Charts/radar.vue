<template>
  <div class="chart-container">
    <div ref="chartsRef" class="chart-main"></div>
  </div>
</template>

<script lang="ts" setup>

// 雷达图
import { ref, } from 'vue'
import defaultThemeColor from '@/config/theme/chart-colors'
import { useCharts } from "@/hook/charts";


const options = ref({
  color: defaultThemeColor,
  grid: {
    left: '10%',
    right: '10%',
    top: '16%',
    bottom: '10%',
  },
  radar: {
    indicator: [
      { name: '力量', max: 10 },
      { name: '智力', max: 10 },
      { name: '敏捷', max: 10 },
      { name: '体力', max: 10 },
      { name: '抗性', max: 10 },
    ],
  },
  series: [
    {
      name: '属性',
      type: 'radar',
      data: [
        {
          name: '战士',
          value: [8, 10, 6, 6, 4],
        },
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
