<template>
  <div class="chart-container">
    <div ref="chartsRef" class="chart-main"></div>
  </div>
</template>

<script lang="ts" setup>

// 旭日图
import { ref,   } from 'vue'

import defaultThemeColor from '@/config/theme/chart-colors'
import {useCharts} from "@/hook/charts";


const options = ref({
  color: defaultThemeColor,
  grid: {
    left: 10,
    right: 10,
    top: 10,
    bottom: 10,
  },
  series: [
    {
      name: 'sunburst',
      type: 'sunburst',
      radius: [20, '90%'],
      label: {
        show: false,
      },
      itemStyle: {
        borderRadius: 4,
        borderWidth: 2,
      },
      data: [
        {
          name: 'Grandpa',
          children: [
            {
              name: 'Uncle Leo',
              value: 15,
              children: [
                {
                  name: 'Cousin Jack',
                  value: 2,
                },
                {
                  name: 'Cousin Mary',
                  value: 5,
                  children: [
                    {
                      name: 'Jackson',
                      value: 2,
                    },
                  ],
                },
                {
                  name: 'Cousin Ben',
                  value: 4,
                },
              ],
            },
            {
              name: 'Father',
              value: 10,
              children: [
                {
                  name: 'Me',
                  value: 5,
                },
                {
                  name: 'Brother Peter',
                  value: 1,
                },
              ],
            },
          ],
        },
        {
          name: 'month',
          value: 10,
          children: [
            {
              name: 'Me',
              value: 5,
            },
            {
              name: 'Brother Peter',
              value: 1,
            },
          ],
        },
        {
          name: 'Nancy',
          children: [
            {
              name: 'Uncle Nike',
              children: [
                {
                  name: 'Cousin Betty',
                  value: 1,
                },
                {
                  name: 'Cousin Jenny',
                  value: 2,
                },
              ],
            },
          ],
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
