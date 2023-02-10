import {ref, Ref} from "vue"

import * as echarts from "echarts";
import { ECharts, EChartOption} from 'echarts'


export type ChartsOptions = {
  supportResize: boolean,
  renderer?: string,  // svg | canvas
  customInit?: CustomInit, // 自定义 init , 暴露出去 ， init 额外的配置参数
}

// type function
export type CustomInit = (options: EChartOption) => ECharts;


export type UseChartsContext = {
  chartDom: HTMLDivElement | HTMLCanvasElement | null,
  chartObj: ECharts
  setOption: (options: EChartOption) => void
}


// @param options 是 echarts 配置项
// @param config 是自己的内置项

export function useCharts(options: EChartOption = {}, config: ChartsOptions = {supportResize: true}) {

  // chart dom 节点
  let chartDom: Ref<HTMLDivElement | HTMLCanvasElement | null> = ref(null)

  // chart 对象
  let chartObj: Ref<ECharts> = ref(null) // 初始化后的对象


  onMounted(() => {
    if (!config?.customInit) {
      _init();
    } else {
      config.customInit(options)
    }
    if (config?.supportResize) {
      window?.addEventListener('resize', _resizeChangeHandle)
    }
  })

  onBeforeUnmount(() => {
    chartObj.value?.dispose()
    if (config?.supportResize) {
      window?.removeEventListener('resize', _resizeChangeHandle)
    }
  })

  const _resizeChangeHandle = () => {
    chartObj.value?.resize()
  }

  const _init = (): void => {
    if (!chartDom.value) {
      throw new Error("chart 未绑定")
    }
    chartObj.value = echarts.init(chartDom.value, null, {
      renderer: config?.renderer ?? 'svg'
    })
    chartObj.value?.setOption(options)
  }

  // 重新设置数据
  // notMerge – Whether not to merge with previous option
  // Default:false
  // lazyUpdate – Whether not to update chart immediately
  // Default:false
  const setOption = (options: EChartOption , notMerge: boolean = false , lazyUpdate : boolean = false): void => {
    if (!chartObj) {
      console.error("chart对象结果", chartObj)
      return;
    }
    chartObj.value?.setOption(options , notMerge ,lazyUpdate)
  }

  const context: Ref<UseChartsContext> = ref({
    chartDom,
    chartObj,
    setOption,
  });

  return {
    context,
    chartDom,
    chartObj,
    setOption,
  }
}
