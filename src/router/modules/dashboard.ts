import { PageEnum } from '@/enum'
import { RouteRecordRaw } from 'vue-router'
import AppLayout from '@/layout/AppLayout/index.vue'

const BASE_ROUTE = 'dashboard'

const DashboardRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: BASE_ROUTE,
    redirect: `${PageEnum.HOME_PATH}`,
    component: AppLayout,
    meta: {
      title: 'Dashboard',
      icon: '',
      permissions: [],
      sort: 0,
    },
    children: [
      {
        path: 'console',
        name: `${BASE_ROUTE}_console`,
        component: () => import('@/pages/Dashboard/index.vue'),
        meta: {
          title: '控制台',
          permissions: [],
        },
      },
    ],
  },
]

export default DashboardRoutes
