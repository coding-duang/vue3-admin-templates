import { Component, h, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { renderIcon } from '@/utils'
import type { MenuOption } from 'naive-ui'
import { HomeOutline, InformationCircleSharp, LogoWebComponent, } from '@vicons/ionicons5'
import { EditOutlined, TableChartOutlined, TableRowsOutlined } from '@vicons/material'
import { MenuOptionObj } from '@/types'

const menuOptionsObj: MenuOptionObj[] = [
  {
    path: '/',
    label: '首页',
    key: 'dashboard',
    icon: HomeOutline,
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
      },
      {
        path: '/components/editor',
        label: '富文本编辑器',
        key: 'editor',
        icon: EditOutlined,
      }
    ]
  },
  {
    path: '/form',
    label: '综合表单',
    key: 'form',
    icon: InformationCircleSharp,
  },
  {
    path: '/stepForm',
    label: '分步表单',
    key: 'stepForm',
    icon: InformationCircleSharp,
  }
]

export const useMenu = () => {
  const activeKey = ref<string | null>(null)

  return {
    activeKey,
    menuOptions: getMenuOptions(),
  }
}

function getMenuOptions(): MenuOption[] {
  return menuOptionsObj.map(route => getRouterInfo(route))
}

function getRouterInfo(routerInfo:MenuOptionObj): MenuOption {
  const { path, label, key, icon, children } = routerInfo

  return {
    label:
        renderLabel(path, label),
    key,
    icon: renderIcon(icon),
    children: children?.map(item => getRouterInfo(item)),
  } as MenuOption
}

function renderLabel(path:string, label: string) {
  return () => h(
    RouterLink,
    {
      to: {
        path,
      },
    },
    { default: () => label }
  )
}
