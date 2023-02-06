import { RouteRecordRaw } from 'vue-router'

export const componentsRoutes: Array<RouteRecordRaw> = [
  {
    path: '/table',
    redirect: '/table',
    children: [
      {
        path: '/synthesizeTable',
        name: 'synthesizeTable',
        component: () => import('@/components/Table/index.vue'),
      },
    ],
  },
]
