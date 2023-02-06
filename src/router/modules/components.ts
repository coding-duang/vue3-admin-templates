import { RouteRecordRaw } from 'vue-router'
import AppLayout from '@/layout/AppLayout/index.vue'
import SubLayout from '@/layout/subLayout.vue'

const BASE_ROUTE = 'components'

const ComponentsRoutes: RouteRecordRaw[] = [
  {
    path: `/${BASE_ROUTE}`,
    name: BASE_ROUTE,
    component: AppLayout,
    redirect: `/${BASE_ROUTE}/table`,
    meta: {
      title: '组件示例',
      icon: '',
      sort: 0,
    },
    children: [
      {
        path: 'table',
        name: `${BASE_ROUTE}_table`,
        redirect: `/${BASE_ROUTE}/table/comprehensive`,
        component: SubLayout,
        meta: {
          title: '表格',
        },
        children: [
          {
            path: 'comprehensive',
            name: `${BASE_ROUTE}_table_comprehensive`,
            component: () => import('@/pages/Components/Table/index.vue'),
          },
        ],
      },
    ],
  },
]

export default ComponentsRoutes