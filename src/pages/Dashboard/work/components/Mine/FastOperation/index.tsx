import { defineComponent, PropType } from 'vue'
import { useRouter } from 'vue-router'
import { NCard, NIcon } from 'naive-ui'
import { getRandomColor } from '@/utils'
import styles from './index.module.scss'
import {
  ComputerRound,
  TableRowsOutlined,
  FormatAlignLeftRound,
  AreaChartFilled,
  LocalPrintshopOutlined,
  CloudDownloadOutlined
} from '@vicons/material'

const OperationData = [
  {
    name: '主控台',
    route: '/dashboard/console',
    icon: ComputerRound
  },
  {
    name: '综合表格',
    route: '/components/table/comprehensive',
    icon: TableRowsOutlined
  },
  {
    name: '综合表单',
    route: '/components/form/basic',
    icon: FormatAlignLeftRound
  },
  {
    name: '图表',
    route: 'components/charts',
    icon: AreaChartFilled
  },
  {
    name: '打印',
    route: '/tools/print',
    icon: LocalPrintshopOutlined
  },
  {
    name: '下载',
    route: '/tools/download',
    icon: CloudDownloadOutlined
  }
]

export const FastOperation = defineComponent({
  name: 'FastOperation',
  setup() {
    return () => <NCard title='快捷操作' hoverable>
      <div class={ styles.fastOperation }>
        { OperationData.map(item => <Item data={ item } />) }
      </div>
    </NCard>
  }
})

const Item = defineComponent({
  name: 'Item',
  props: {
    data: {
      type: Object as PropType<typeof OperationData[number]>,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()

    const jump = (path: string) => router.push(path)

    return () => <div class={ styles.item } onClick={ () => jump(props.data.route) }>
      <NIcon size="40" color={ getRandomColor() } component={ props.data.icon } />
      <div class={ styles.name }>{ props.data.name }</div>
    </div>
  }
})
