import { h, ref, watch, getCurrentInstance } from 'vue'
import { RouteRecordRaw, RouterLink, useRoute } from 'vue-router'
import { useAuthRoutesStore } from '@/store'
import { renderIcon } from '@/utils'
import type { MenuOption } from 'naive-ui'
import {
  HexagonOutlined,
  HomeOutlined,
  HourglassBottomOutlined,
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
  ApiFilled,
  AutoFixOffRound,
  MapsHomeWorkRound,
  WorkFilled,
} from '@vicons/material'
import { MenuOptionObj } from '@/types'
import { Icons } from './registerIcons'
import { isExternal, strMontage } from '@/router/guard/utils'

const menuOptionsObj: MenuOptionObj[] = [
  {
    path: '/dashboard',
    label: '首页',
    key: 'console',
    icon: HomeOutlined,
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
    icon: HexagonOutlined,
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
      {
        path: '/tools/flowchart',
        label: '流程图',
        key: 'flowchart',
        icon: HourglassBottomOutlined,
      },
      {
        path: '/tools/download',
        label: '文件下载',
        key: 'download',
        icon: AutoFixOffRound,
      },
      {
        path: '/tools/draggable',
        label: '拖拽',
        key: 'draggable',
        icon: ApiFilled,
      },
    ],
  },
]

export const useMenu = () => {
  const activeKey = ref<string | null>(null)

  const route = useRoute()
  const authStore = useAuthRoutesStore()

  const renderLabel = (route: RouteRecordRaw) => {
    if (route.children?.length > 0 && !route.meta.isSingle) {
      return route.meta.title
    }
    if (isExternal(route.path)) {
      return () =>
        h(
          'a',
          {
            href: route.path,
            target: '_blank',
          },
          { default: () => route.meta.title }
        )
    }
    return () =>
      h(
        RouterLink,
        {
          to: {
            path: route.path,
          },
        },
        { default: () => route.meta.title }
      )
  }

  const getMenuOptions = (routes: RouteRecordRaw[]) => {
    const menuOptions: MenuOption[] = []
    routes.forEach(route => {
      const {
        path,
        meta: { title: label },
        meta: { icon },
        children,
      } = route
      const key = strMontage(path, '-')

      const menu: MenuOption = {
        label: renderLabel(route),
        key,
        icon: renderIcon(Icons[icon] || EditOutlined),
      }
      if (children && children.length > 0) {
        menu.children = getMenuOptions(children)
      }
      menuOptions.push(menu)
    })
    return menuOptions
  }

  watch(
    () => route.path,
    (newVal: string | null) => {
      // const key = newVal.split('/').pop()
      const key = strMontage(newVal, '-')
      activeKey.value = key
    },
    {
      immediate: true,
    }
  )

  return {
    activeKey,
    menuOptions: getMenuOptions(authStore.getAuthSideBar),
  }
}

// function getMenuOptions(): MenuOption[] {
//   return menuOptionsObj.map(route => getRouterInfo(route))
// }

// function getRouterInfo(routerInfo: MenuOptionObj): MenuOption {
//   const { path, label, key, icon, children } = routerInfo

//   return {
//     label: renderLabel(path, label),
//     key,
//     icon: renderIcon(icon),
//     children: children?.map(item => getRouterInfo(item)),
//   } as MenuOption
// }

// function renderLabel(path: string, label: string) {
//   return () =>
//     h(
//       RouterLink,
//       {
//         to: {
//           path,
//         },
//       },
//       { default: () => label }
//     )
// }
