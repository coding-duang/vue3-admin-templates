import { ref, unref, Ref, onMounted, onBeforeUnmount } from 'vue'
import { ECOption } from '@/types'
import * as echarts from 'echarts/core'
import {
  BarChart,
  LineChart,
  PieChart,
  ScatterChart,
  CandlestickChart,
  RadarChart,
  TreemapChart,
  SunburstChart,
  FunnelChart,
  GaugeChart,
  ThemeRiverChart,
} from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  SingleAxisComponent,
} from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  BarChart,
  LineChart,
  PieChart,
  ScatterChart,
  CandlestickChart,
  RadarChart,
  TreemapChart,
  SunburstChart,
  FunnelChart,
  GaugeChart,
  ThemeRiverChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  SingleAxisComponent,
  DatasetComponent,
  TransformComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
])

export type EChartsInitOpts = {
  locale?: string
  renderer?: 'canvas' | 'svg'
  devicePixelRatio?: number
  useDirtyRect?: boolean
  useCoarsePointer?: boolean
  pointerSize?: number
  ssr?: boolean
  width?: number | string
  height?: number | string
}

export type InitOpt = {
  theme?: string | object
  opts?: EChartsInitOpts
}

export const useChart = (
  options: ECOption | Ref<ECOption>,
  initOpt: InitOpt = {}
) => {
  const chartRef = ref<HTMLElement | null>(null)
  const chartInstance = ref<echarts.ECharts>(null)

  const { theme = null, opts = { renderer: 'svg' } } = initOpt

  const init = () => {
    chartInstance.value = echarts.init(chartRef.value, theme, opts)
    chartInstance.value?.setOption(unref(options))
  }

  const resize = () => chartInstance.value?.resize()

  onMounted(() => {
    init()
    window.addEventListener('resize', resize)
  })

  onBeforeUnmount(() => {
    chartInstance.value?.dispose()
    window.removeEventListener('resize', resize)
  })

  return {
    chartRef,
    chartInstance,
  }
}
