import { h, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { renderIcon } from '@/utils'
import type { MenuOption } from 'naive-ui'
import {
  HomeOutline,
  LogoWebComponent,
  InformationCircleSharp,
} from '@vicons/ionicons5'

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
    menuOptions,
  }
}
