import { h, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { renderIcon } from '@/utils'
import type { MenuOption } from 'naive-ui'
import {
  HomeOutline,
  LogoWebComponent,
  InformationCircleSharp,
} from '@vicons/ionicons5'
import { TableRowsOutlined, TableChartOutlined } from '@vicons/material'

export const useMenu = () => {
  const activeKey = ref<string | null>(null)

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
      label: '组件',
      key: 'components',
      icon: renderIcon(LogoWebComponent),
      children: [
        {
          key: 'table',
          icon: renderIcon(TableRowsOutlined),
          label: '表格',
          children: [
            {
              label: () =>
                h(
                  RouterLink,
                  {
                    to: {
                      path: '/components/table/comprehensive',
                    },
                  },
                  { default: () => '综合表格' }
                ),
              key: 'synthesizeTable',
              icon: renderIcon(TableChartOutlined),
            },
          ],
        },
      ],
    },
  ]

  return {
    activeKey,
    menuOptions,
  }
}
