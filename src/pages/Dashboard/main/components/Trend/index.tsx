import { defineComponent, PropType, Component, h, ref } from 'vue'
import { NGrid, NGridItem, NCard, CardProps, NSkeleton } from 'naive-ui'
import { useChart } from '@/hook'
import { TrendChartData } from './config'
import styles from './index.module.scss'

export const Trend = defineComponent({
  name: 'Trend',
  setup() {
    const loading = ref(false)

    return () => {
      return <div class={ styles.Trend }>
        <NGrid cols="4" x-gap={ 12 } y-gap={ 8 } item-responsive responsive="screen">
          <NGridItem span="4 m:4 l:2">

          </NGridItem>

          <NGridItem span="2 m:2 l:1"></NGridItem>

          <NGridItem span="2 m:2 l:1"></NGridItem>
        </NGrid>
      </div>
    }
  }
})

const Card = defineComponent({
  name: 'Card',
  props: {
    cardProps: {
      type: Object as PropType<Partial<CardProps>>,
      default: () => ({} as Partial<CardProps>)
    },
    loading: {
      type: Boolean,
      default: true
    },
    currentComponent: {
      type: Object as PropType<Component>,
      required: true
    }
  },
  setup(props) {
    return () => {
      return <NCard hoverable { ...props.cardProps }>
        {{
          default: () => {
            return props.loading ? <NSkeleton height="40px" repeat={ 6 } /> : h(props.currentComponent)
          }
        }}
      </NCard>
    }
  }
})

const Chart = defineComponent({
  name: 'Chart',
  setup() {
    // const { chartRef } = useChart()

    return () => {
      return <div class={ styles.chart } >

      </div>
    }
  }
})
