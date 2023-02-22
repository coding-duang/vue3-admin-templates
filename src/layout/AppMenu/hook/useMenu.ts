import { h, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { renderIcon } from '@/utils'
import type { MenuOption } from 'naive-ui'
import {
  HomeOutline,
  HourglassOutline,
  LogoWebComponent,
} from '@vicons/ionicons5'
import {
  EditOutlined,
  TableRowsOutlined,
  TableChartTwotone,
  DynamicFeedOutlined,
  FormatAlignJustifyOutlined,
  FormatListNumberedFilled,
  NextPlanOutlined,
  PieChartOutlineTwotone,
  DriveFolderUploadOutlined,
  SettingsInputComponentOutlined,
  LocalPrintshopOutlined,
  MapsHomeWorkRound,
  WorkFilled,
} from '@vicons/material'
import { MenuOptionObj } from '@/types'

const menuOptionsObj: MenuOptionObj[] = [
  {
    path: '/dashboard',
    label: '首页',
    key: 'console',
    icon: HomeOutline,
    children: [
      {
        path: '/dashboard/console',
        label: '主控台',
        key: 'console',
        icon: MapsHomeWorkRound,
      },
      {
        path: '/dashboard/work',
        label: '工作台',
        key: 'work',
        icon: WorkFilled,
      },
    ],
  },
  {
    path: '/components',
    label: '组件',
    key: 'components',
    icon: LogoWebComponent,
    children: [
      {
        path: '/components/table',
        label: '表格',
        key: 'table',
        icon: TableRowsOutlined,
        children: [
          {
            label: '综合表格',
            path: '/components/table/comprehensive',
            icon: TableChartTwotone,
            key: 'comprehensive',
          },
          {
            label: '动态表格',
            path: '/components/table/dynamic',
            icon: DynamicFeedOutlined,
            key: 'dynamic',
          },
        ],
      },
      {
        path: '/components/form',
        label: '表单',
        key: 'form',
        icon: FormatAlignJustifyOutlined,
        children: [
          {
            path: '/components/form/basic',
            label: '综合表单',
            key: 'basic',
            icon: FormatListNumberedFilled,
          },
          {
            path: '/components/form/step',
            label: '分步表单',
            key: 'step',
            icon: NextPlanOutlined,
          },
        ],
      },
      {
        path: '/components/editor',
        label: '富文本编辑器',
        key: 'editor',
        icon: EditOutlined,
      },
      {
        path: '/components/flowchart',
        label: '流程图',
        key: 'flowchart',
        icon: HourglassOutline,
      },
      {
        path: '/components/charts',
        label: '图表',
        key: 'charts',
        icon: PieChartOutlineTwotone,
      },
      {
        path: '/components/upload',
        label: '大文件上传',
        key: 'upload',
        icon: DriveFolderUploadOutlined,
      },
    ],
  },
  {
    path: '/tools',
    label: '工具',
    key: 'tools',
    icon: SettingsInputComponentOutlined,
    children: [
      {
        path: '/tools/print',
        label: '打印',
        key: 'print',
        icon: LocalPrintshopOutlined,
      },
    ],
  },
]

export const useMenu = () => {
  const activeKey = ref<string | null>(null)

  const route = useRoute()

  watch(
    () => route.path,
    (newVal: string | null) => {
      const key = newVal.split('/').pop()
      activeKey.value = key
    }
  )

  return {
    activeKey,
    menuOptions: getMenuOptions(),
  }
}

function getMenuOptions(): MenuOption[] {
  return menuOptionsObj.map(route => getRouterInfo(route))
}

function getRouterInfo(routerInfo: MenuOptionObj): MenuOption {
  const { path, label, key, icon, children } = routerInfo

  return {
    label: renderLabel(path, label),
    key,
    icon: renderIcon(icon),
    children: children?.map(item => getRouterInfo(item)),
  } as MenuOption
}

function renderLabel(path: string, label: string) {
  return () =>
    h(
      RouterLink,
      {
        to: {
          path,
        },
      },
      { default: () => label }
    )
}
