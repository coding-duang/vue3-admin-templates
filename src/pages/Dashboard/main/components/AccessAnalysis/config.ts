import { ECOption } from '@/types'
import { frandom } from '@/utils'
import { AnalysisItemType } from './type'

export const AnalysisData: AnalysisItemType[] = [
  {
    title: '访问总人次',
    value: frandom(5000, 6000),
    isRise: true,
    compareValue: 588.85,
  },
  {
    title: '内容发布量',
    value: frandom(2000, 3000),
    isRise: true,
    compareValue: 257.56,
  },
  {
    title: '评论总量',
    value: frandom(8000, 9000),
    isRise: false,
    compareValue: 358.8,
  },
  {
    title: '分享总量',
    value: frandom(10000, 11000),
    isRise: true,
    compareValue: 135.85,
  },
]

export const Line: ECOption = {
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

export const Bar: ECOption = {
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

export const Line2: ECOption = {
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

export const Pie: ECOption = {
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
