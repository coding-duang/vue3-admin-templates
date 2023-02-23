import { ref } from 'vue'
import * as echarts from 'echarts/core'
import { ECOption } from '@/types'
import { frandom } from '@/utils'
import { useInterval } from '@/hook'
import { AnalysisItemType } from './type'

export const generateNum = (len: number, start: number, end: number) =>
  Array.from(new Array(len), () => frandom(start, end))

const createConfigData = () => {
  const AnalysisData: AnalysisItemType[] = [
    {
      title: '访问总人次',
      value: frandom(5000, 10000),
      isRise: !!frandom(0, 1),
      compareValue: frandom(100, 500),
    },
    {
      title: '内容发布量',
      value: frandom(2000, 5000),
      isRise: !!frandom(0, 1),
      compareValue: frandom(100, 500),
    },
    {
      title: '评论总量',
      value: frandom(5000, 9000),
      isRise: !!frandom(0, 1),
      compareValue: frandom(100, 500),
    },
    {
      title: '分享总量',
      value: frandom(10000, 15000),
      isRise: !!frandom(0, 1),
      compareValue: frandom(100, 500),
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
        data: generateNum(9, 5000, 8000),
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
        data: generateNum(9, 5000, 9000),
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
    color: ['#80FFA5', '#00DDFF'],
    tooltip: {
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    legend: {
      data: ['签单', '回款'],
    },
    toolbox: {
      feature: {
        saveAsImage: {
          name: '保存为图片',
        },
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
        smooth: true,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(128, 255, 165)',
            },
            {
              offset: 1,
              color: 'rgb(1, 191, 236)',
            },
          ]),
        },
        emphasis: {
          focus: 'series',
        },
        data: generateNum(12, 10000, 80000),
      },
      {
        name: '回款',
        type: 'line',
        stack: 'Total',
        smooth: true,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(0, 221, 255)',
            },
            {
              offset: 1,
              color: 'rgb(77, 119, 255)',
            },
          ]),
        },
        emphasis: {
          focus: 'series',
        },
        data: generateNum(12, 10000, 80000),
      },
    ],
  }

  const TrendRankChartData: ECOption = {
    color: ['#1890ff'],
    tooltip: {
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      top: 20,
      bottom: 20,
      // right: -20,
    },
    xAxis: {
      show: false,
    },
    yAxis: {
      type: 'category',
      axisLabel: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      data: [
        '王德显',
        '杜丽',
        '朱超群',
        '杜永灵',
        '周长送',
        '方式林',
        '沈达',
        '吴倩',
        '西门町',
      ],
    },
    series: [
      {
        name: '消费排名',
        type: 'bar',
        barWidth: 18,
        itemStyle: {
          borderRadius: 25,
        },
        barGap: 1,
        label: {
          show: true,
          formatter: '{b}',
          position: 'insideStart',
          align: 'center',
          offset: [30, 4],
        },
        data: generateNum(9, 5000, 9000),
      },
    ],
  }

  const consumerGroupData: ECOption = {
    color: ['#2cab40', '#00b2ff'],
    tooltip: {
      trigger: 'item',
    },
    radar: {
      indicator: [
        { name: '学生', max: 5800 },
        { name: '销售', max: 8500 },
        { name: '工程师', max: 6800 },
        { name: '律师', max: 7250 },
        { name: '会计', max: 9000 },
      ],
    },
    series: [
      {
        type: 'radar',
        symbol: 'none',
        emphasis: {
          areaStyle: {
            color: 'rgba(0,250,0,0.3)',
          },
        },
        data: [
          {
            value: generateNum(5, 3000, 5000),
            name: '律师服务',
          },
          {
            value: generateNum(5, 3000, 5000),
            name: '程序服务',
          },
        ],
      },
    ],
  }

  return {
    AnalysisData,
    TrendChartData,
    TrendRankChartData,
    consumerGroupData,
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
