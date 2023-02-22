import { RouteRecordRaw } from 'vue-router'
import AppLayout from '@/layout/AppLayout/index.vue'
import SubLayout from '@/layout/subLayout.vue'

const BASE_ROUTE = 'tools'

const ToolsRoutes: RouteRecordRaw[] = [
  {
    path: `/${BASE_ROUTE}`,
    name: BASE_ROUTE,
    component: AppLayout,
    meta: {
      title: '工具',
    },
    children: [
      {
        path: 'print',
        name: `${BASE_ROUTE}_print`,
        component: () => import('@/pages/Tools/Print/index.vue'),
        meta: {
          title: '打印',
        },
      },
    ],
  },
]

export default ToolsRoutes
