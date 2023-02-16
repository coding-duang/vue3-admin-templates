import { h, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { renderIcon } from '@/utils'
import type { MenuOption } from 'naive-ui'
import {
  HomeOutline,
  InformationCircleSharp,
  HourglassOutline,
  LogoWebComponent,
} from '@vicons/ionicons5'
import {
  EditOutlined,
  TableRowsOutlined,
  TableChartTwotone,
  DynamicFeedOutlined,
} from '@vicons/material'
import { MenuOptionObj } from '@/types'

const menuOptionsObj: MenuOptionObj[] = [
  {
    path: '/',
    label: '首页',
    key: 'dashboard',
    icon: HomeOutline,
  },
  {
    path: '/flowchart',
    label: '流程图',
    key: 'flowchart',
    icon: HourglassOutline,
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
            key: 'comprehensiveTable',
          },
          {
            label: '动态表格',
            path: '/components/table/dynamic',
            icon: DynamicFeedOutlined,
            key: 'dynamicTable',
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
        path: '/components/form/basic',
        label: '综合表单',
        key: 'form',
        icon: InformationCircleSharp,
      },
      {
        path: '/components/form/step',
        label: '分步表单',
        key: 'stepForm',
        icon: InformationCircleSharp,
      },
      {
        path: '/components/charts',
        label: '图表',
        key: 'charts',
        icon: InformationCircleSharp,
      },
      {
        path: '/components/upload',
        label: '文件上传',
        key: 'upload',
        icon: InformationCircleSharp,
      },
    ],
  },
]

export const useMenu = () => {
  const activeKey = ref<string | null>(null)
  const collapsed = ref(false)

  const menuOptions: MenuOption[] = [
    {
      label: () =>
        h(
          RouterLink,
          {
            to: {
              path: '/',
            },
          },
          { default: () => '首页' }
        ),
      key: 'dashboard',
      icon: renderIcon(HomeOutline),
    },
    {
      label: () =>
        h(
          RouterLink,
          {
            to: {
              path: '/FlowChart',
            },
          },
          { default: () => '流程图' }
        ),
      key: 'FlowChart',
      icon: renderIcon(HourglassOutline),
    },
    {
      label: '组件',
      key: 'component',
      icon: renderIcon(LogoWebComponent),
      children: [
        {
          label: () =>
            h(
              RouterLink,
              {
                to: {
                  path: '/404',
                },
              },
              { default: () => '组件一' }
            ),
          key: 'notFound',
          icon: renderIcon(InformationCircleSharp),
        },
      ],
    },
  ]

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
