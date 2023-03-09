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
      {
        path: 'download',
        meta: {
          title: '文件下载',
        },
        name: `${BASE_ROUTE}_download`,
        component: () => import('@/pages/Tools/Download/index.vue'),
      },
      {
        path: 'draggable',
        meta: {
          title: '拖拽',
        },
        name: `${BASE_ROUTE}_draggable`,
        component: () => import('@/pages/Tools/Draggable/index.vue'),
      },
      {
        path: 'flowChart',
        name: `${BASE_ROUTE}_flowChart`,
        component: () => import('@/pages/Tools/FlowChart/index.vue'),
        meta: {
          title: '流程图',
          permissions: [],
        },
      },
    ],
  },
]

export default ToolsRoutes
