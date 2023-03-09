import * as echarts from 'echarts/core'
import {
  BarSeriesOption,
  PieSeriesOption,
  LineSeriesOption,
  RadarSeriesOption,
} from 'echarts/charts'

import {
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  DatasetComponentOption,
  LegendComponentOption,
} from 'echarts/components'

export type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | PieSeriesOption
  | RadarSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
  | LegendComponentOption
>
