import { PageEnum } from '@/enum'
import { RouteRecordRaw } from 'vue-router'
import AppLayout from '@/layout/AppLayout/index.vue'

const BASE_ROUTE = 'flowchart'

const DashboardRoutes: RouteRecordRaw[] = [
  {
    path: '/flowchart',
    name: BASE_ROUTE,
    redirect: `${PageEnum.FLOWCHART_PATH}`,
    component: AppLayout,
    meta: {
      title: 'FlowChart',
      icon: '',
      permissions: [],
      sort: 0,
    },
    children: [
      {
        path: 'example',
        name: `${BASE_ROUTE}_example`,
        component: () => import('@/pages/FlowChart/index.vue'),
        meta: {
          title: '案例',
          permissions: [],
        },
      },
    ],
  },
]

export default DashboardRoutes
