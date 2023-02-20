import { ECOption } from '@/types'
import defaultThemeColor from '@/config/theme/chart-colors'

export const Bar = {
  color: defaultThemeColor,
  grid: {
    left: '10%',
    right: 10,
    top: 20,
    bottom: 20,
  },
  xAxis: {
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20, 33],
    },
  ],
}

export const CandleStick = {
  color: defaultThemeColor,
  grid: {
    left: '10%',
    right: 10,
    top: 20,
    bottom: 20,
  },
  xAxis: {
    data: ['2017-10-24', '2017-10-25', '2017-10-26', '2017-10-27'],
  },
  yAxis: {},
  series: [
    {
      type: 'candlestick',
      data: [
        [20, 34, 10, 38],
        [40, 35, 30, 50],
        [31, 38, 33, 44],
        [38, 15, 5, 42],
      ],
    },
  ],
}

export const Funnel = {
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
}

export const Gauge = {
  color: defaultThemeColor,
  tooltip: {
    formatter: '{a} <br/>{b} : {c}%',
  },
  series: [
    {
      name: '仪表盘',
      type: 'gauge',
      radius: '100%',
      progress: {
        show: true,
      },
      detail: {
        valueAnimation: true,
        formatter: '{value}',
      },
      data: [{ value: 50, name: 'SCORE' }],
    },
  ],
}

export const Line = {
  color: defaultThemeColor,
  grid: {
    left: '10%',
    right: 10,
    top: 20,
    bottom: 20,
  },
  xAxis: {
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'line',
      data: [5, 20, 36, 10, 10, 20, 33],
    },
  ],
}

export const Pie = {
  color: defaultThemeColor,
  tooltip: {
    trigger: 'item',
  },
  grid: {
    left: 5,
    right: 5,
    top: 5,
    bottom: 5,
  },

  series: [
    {
      name: '销量',
      type: 'pie',
      labelLine: {
        show: false,
      },
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 14,
          fontWeight: 'bold',
        },
      },
      radius: ['40%', '70%'],
      itemStyle: {
        borderRadius: 6,
        borderColor: '#fff',
        borderWidth: 2,
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' },
      ],
    },
  ],
}

export const Radar = {
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
}

export const Scatter = {
  color: defaultThemeColor,
  grid: {
    left: '10%',
    right: 10,
    top: 20,
    bottom: 20,
  },
  xAxis: {},
  yAxis: {},
  series: [
    {
      symbolSize: 10,
      data: [
        [10.0, 8.04],
        [8.07, 6.95],
        [13.0, 7.58],
        [9.05, 8.81],
        [11.0, 8.33],
        [14.0, 7.66],
        [13.4, 6.81],
        [10.0, 6.33],
        [14.0, 8.96],
        [12.5, 6.82],
        [9.15, 7.2],
        [11.5, 7.2],
        [3.03, 4.23],
        [12.2, 7.83],
        [2.02, 4.47],
        [1.05, 3.33],
        [4.05, 4.96],
        [6.03, 7.24],
        [12.0, 6.26],
        [12.0, 8.84],
        [7.08, 5.82],
        [5.02, 5.68],
      ],
      type: 'scatter',
    },
  ],
}

export const Sunburst = {
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
}

export const Themeriver = {
  color: defaultThemeColor,
  tooltip: {
    trigger: 'axis' as 'axis',
    axisPointer: {
      type: 'line',
      lineStyle: {
        color: 'rgba(0,0,0,0.2)',
        width: 1,
      },
    },
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
        show: true,
      },
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
        opacity: 0.2,
      },
    },
  },
  series: [
    {
      name: '河流图',
      type: 'themeRiver',
      emphasis: {
        itemStyle: {
          shadowBlur: 20,
          shadowColor: 'rgba(0,0,0,0.8)',
        },
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
        ['2015/11/28', 10, 'DD'],
      ],
    },
  ],
}

export const TreeMap = {
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
}

export const useConfig = () => {
  return [
    {
      title: '折线图',
      options: Line as ECOption,
    },
    {
      title: '柱状图',
      options: Bar as ECOption,
    },
    {
      title: '饼状图',
      options: Pie as ECOption,
    },
    {
      title: '散点图',
      options: Scatter as ECOption,
    },
    {
      title: 'K线图',
      options: CandleStick as ECOption,
    },
    {
      title: '雷达图',
      options: Radar as ECOption,
    },
    {
      title: '矩形树图',
      options: TreeMap as ECOption,
    },
    {
      title: '旭日图',
      options: Sunburst as ECOption,
    },
    {
      title: '漏斗图',
      options: Funnel as ECOption,
    },
    {
      title: '仪表盘',
      options: Gauge as ECOption,
    },
    {
      title: '水流图',
      options: Themeriver as ECOption,
    },
  ]
}
