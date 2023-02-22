import { ECOption } from '@/types'
import { frandom } from '@/utils'

export const TrendChartData: ECOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985',
      },
    },
  },
  // legend: {
  //   data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
  // },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月',
      ],
    },
  ],
  yAxis: [
    {
      type: 'value',
    },
  ],
  series: [
    {
      name: '签单',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      data: [
        frandom(10000, 80000),
        frandom(10000, 80000),
        frandom(10000, 80000),
        frandom(10000, 80000),
        frandom(10000, 80000),
        frandom(10000, 80000),
        frandom(10000, 80000),
      ],
    },
    {
      name: '回款',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      data: [
        frandom(10000, 80000),
        frandom(10000, 80000),
        frandom(10000, 80000),
        frandom(10000, 80000),
        frandom(10000, 80000),
        frandom(10000, 80000),
        frandom(10000, 80000),
      ],
    },
  ],
}
