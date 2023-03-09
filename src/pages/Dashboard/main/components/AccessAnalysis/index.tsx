import { defineComponent, PropType, watch, inject } from 'vue'
import { AnalysisItemType, ConfigData } from './type'
import { useChart } from '@/hook'
import { ECOption } from '@/types'
import { NGrid, NGridItem, NNumberAnimation, NIcon } from 'naive-ui'
import { ArrowUpwardOutlined, ArrowDownwardOutlined } from '@vicons/material'
import styles from './index.module.scss'

export const AccessAnalysis = defineComponent({
  name: 'AccessAnalysis',
  setup() {
    const configData = inject<ConfigData>('configData')
    return () => {
      return (
        <div class={styles.AccessAnalysis}>
          <div class={styles.subtitle}>数据分析</div>
          <NGrid
            cols="4"
            x-gap={12}
            y-gap={8}
            item-responsive
            responsive="screen"
          >
            {configData.value.AnalysisData.map(
              (analysis: AnalysisItemType, index: number) => (
                <NGridItem span="4 m:2 l:1">
                  <AnalysisItem
                    data={analysis}
                    index={index}
                    chartData={configData.value.chart}
                  />
                </NGridItem>
              )
            )}
          </NGrid>
        </div>
      )
    }
  },
})

const AnalysisItem = defineComponent({
  name: 'AnalysisItem',
  props: {
    data: {
      type: Object as PropType<AnalysisItemType>,
      default: () => ({}),
    },
    index: {
      type: Number,
      default: 0,
    },
    chartData: {
      type: Array as PropType<ECOption[]>,
      required: true,
    },
  },
  setup(props) {
    const { chartRef, chartInstance } = useChart(props.chartData[props.index])

    watch(
      () => props.chartData,
      newVal => {
        chartInstance.value.setOption(newVal[props.index])
      }
    )
    return () => {
      return (
        <div class={[styles.itemWrapper, styles[`bg${props.index + 1}`]]}>
          <div class={styles.left}>
            <div class={styles.title}>{props.data.title}</div>
            <div class={styles.value}>
              <NNumberAnimation showSeparator from={0} to={props.data.value} />
            </div>
            <div class={styles.compare}>
              <div class={styles.desc}>较昨日</div>
              <div
                class={[styles.compareValue, !props.data.isRise && styles.down]}
              >
                {props.data.compareValue}
                <NIcon size="20">
                  {props.data.isRise ? (
                    <ArrowUpwardOutlined />
                  ) : (
                    <ArrowDownwardOutlined />
                  )}
                </NIcon>
              </div>
            </div>
          </div>
          <div class={styles.right}>
            <div class={styles.chart} ref={chartRef}></div>
          </div>
        </div>
      )
    }
  },
})
