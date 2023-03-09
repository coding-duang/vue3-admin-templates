import { defineComponent, PropType, inject, ref, watch } from 'vue'
import { NGrid, NGridItem, NCard, CardProps, NSkeleton } from 'naive-ui'
import { useChart } from '@/hook'
import styles from './index.module.scss'
import { ECOption } from '@/types'
import { ConfigData } from '../AccessAnalysis/type'

export const Trend = defineComponent({
  name: 'Trend',
  setup() {
    const loading = ref(true)
    const configData = inject<ConfigData>('configData')
    setTimeout(() => {
      loading.value = false
    }, 1500)
    return () => {
      return (
        <div class={styles.Trend}>
          <NGrid
            cols="4"
            x-gap={12}
            y-gap={8}
            item-responsive
            responsive="screen"
          >
            <NGridItem span="4 m:4 l:2">
              <Card
                cardProps={{ title: '趋势' }}
                loading={loading.value}
                options={configData.value.TrendChartData}
              />
            </NGridItem>

            <NGridItem span="2 m:2 l:1">
              <Card
                cardProps={{ title: '消费排名' }}
                loading={loading.value}
                options={configData.value.TrendRankChartData}
              />
            </NGridItem>

            <NGridItem span="2 m:2 l:1">
              <Card
                cardProps={{ title: '消费群体' }}
                loading={loading.value}
                options={configData.value.consumerGroupData}
              />
            </NGridItem>
          </NGrid>
        </div>
      )
    }
  },
})

export const Card = defineComponent({
  name: 'Card',
  props: {
    cardProps: {
      type: Object as PropType<Partial<CardProps>>,
      default: () => ({} as Partial<CardProps>),
    },
    loading: {
      type: Boolean,
      default: true,
    },
    options: {
      type: Object as PropType<ECOption>,
      required: true,
    },
  },
  setup(props) {
    return () => {
      return (
        <NCard hoverable {...props.cardProps}>
          {{
            default: () => {
              return props.loading ? (
                <NSkeleton height="40px" text repeat={5} />
              ) : (
                <Chart options={props.options} />
              )
            },
          }}
        </NCard>
      )
    }
  },
})

const Chart = defineComponent({
  name: 'Chart',
  props: {
    options: {
      type: Object as PropType<ECOption>,
      required: true,
    },
  },
  setup(props) {
    const { chartRef, chartInstance } = useChart(props.options)

    watch(
      () => props.options,
      newVal => {
        chartInstance.value.setOption(newVal)
      }
    )

    return () => <div class={styles.chart} ref={chartRef}></div>
  },
})
