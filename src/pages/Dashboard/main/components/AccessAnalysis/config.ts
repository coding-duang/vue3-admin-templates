import { ref, unref } from 'vue'
import { ECOption } from '@/types'
import { frandom } from '@/utils'
import { useInterval } from '@/hook'
import { AnalysisItemType } from './type'

const createConfigData = () => {
  const AnalysisData: AnalysisItemType[] = [
    {
      title: '访问总人次',
      value: frandom(5000, 10000),
      isRise: true,
      compareValue: 588.85,
    },
    {
      title: '内容发布量',
      value: frandom(2000, 5000),
      isRise: true,
      compareValue: 257.56,
    },
    {
      title: '评论总量',
      value: frandom(5000, 9000),
      isRise: false,
      compareValue: 358.8,
    },
    {
      title: '分享总量',
      value: frandom(10000, 15000),
      isRise: true,
      compareValue: 135.85,
    },
  ]

  const Line: ECOption = {
    color: ['#00b2ff'],
    grid: {
      left: -10,
      right: 10,
      top: 20,
      bottom: 20,
    },
    tooltip: {
      axisPointer: {
        type: 'shadow',
      },
    },
    xAxis: {
      type: 'category',
      show: false,
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        name: '访问次数',
        type: 'line',
        smooth: true,
        data: [
          frandom(1000, 10000),
          frandom(1000, 10000),
          frandom(1000, 10000),
          frandom(1000, 10000),
          frandom(1000, 10000),
          frandom(1000, 10000),
          frandom(1000, 10000),
          frandom(1000, 10000),
          frandom(1000, 10000),
        ],
      },
    ],
  }

  const Bar: ECOption = {
    color: ['#86df6c', '#2cab40'],
    grid: {
      left: -5,
      right: 10,
      top: 5,
      bottom: 5,
    },
    tooltip: {
      axisPointer: {
        type: 'shadow',
      },
    },
    xAxis: {
      type: 'category',
      show: false,
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        name: '发布内容',
        type: 'bar',
        data: [
          frandom(1000, 3000),
          { value: frandom(1000, 3000), itemStyle: { color: '#2cab40' } },
          frandom(1000, 3000),
          { value: frandom(1000, 3000), itemStyle: { color: '#2cab40' } },
          frandom(1000, 3000),
          { value: frandom(1000, 3000), itemStyle: { color: '#2cab40' } },
          frandom(1000, 3000),
          { value: frandom(1000, 3000), itemStyle: { color: '#2cab40' } },
          frandom(1000, 3000),
          { value: frandom(1000, 3000), itemStyle: { color: '#2cab40' } },
          frandom(1000, 3000),
          { value: frandom(1000, 3000), itemStyle: { color: '#2cab40' } },
          frandom(1000, 3000),
          { value: frandom(1000, 3000), itemStyle: { color: '#2cab40' } },
          frandom(1000, 3000),
        ],
      },
    ],
  }

  const Line2: ECOption = {
    color: ['#fcb040'],
    grid: {
      left: -10,
      right: 10,
      top: 20,
      bottom: 20,
    },
    tooltip: {
      axisPointer: {
        type: 'shadow',
      },
    },
    xAxis: {
      type: 'category',
      show: false,
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        name: '评论总数',
        type: 'line',
        smooth: true,
        data: [
          frandom(5000, 9000),
          frandom(5000, 9000),
          frandom(5000, 9000),
          frandom(5000, 9000),
          frandom(5000, 9000),
          frandom(5000, 9000),
          frandom(5000, 9000),
          frandom(5000, 9000),
          frandom(5000, 9000),
        ],
      },
    ],
  }

  const Pie: ECOption = {
    color: ['#00b2ff', '#165dff', '#8d4eda'],
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '6%',
      right: 'right',
    },
    // grid: {
    //   top: 5,
    //   bottom: 5,
    // },
    series: [
      {
        name: '分享总量',
        type: 'pie',
        labelLine: {
          show: false,
        },
        label: {
          show: false,
          position: 'center',
        },
        avoidLabelOverlap: false,
        radius: ['40%', '70%'],
        data: [
          { value: frandom(8000, 11000), name: '视频类' },
          { value: frandom(8000, 11000), name: '文本类' },
          { value: frandom(8000, 11000), name: '图文类' },
        ],
      },
    ],
  }

  const TrendChartData: ECOption = {
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

  return {
    AnalysisData,
    TrendChartData,
    chart: [Line, Bar, Line2, Pie],
  }
}

export const useConfig = () => {
  const data = createConfigData()
  const result = ref(data)

  useInterval(() => {
    result.value = createConfigData()
  })

  return {
    configData: result,
  }
}
