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
          {
            path: 'dynamic',
            name: `${BASE_ROUTE}_table_dynamic`,
            component: () =>
              import('@/pages/Components/Table/DynamicTable/index.vue'),
          },
          {
            path: 'editor',
            meta: {
              title: '编辑器',
            },
            name: `${BASE_ROUTE}_editor`,
            component: () => import('@/pages/Components/Editor/index.vue'),
          },
        ],
      },
      {
        path: 'form',
        name: `${BASE_ROUTE}_form`,
        // redirect: `/${BASE_ROUTE}/table/comprehensive`,
        component: SubLayout,
        children: [
          {
            path: 'basic',
            meta: {
              title: '表单',
            },
            name: `${BASE_ROUTE}_basic_form`,
            component: () => import('@/pages/Components/BasicForm/index.vue'),
          },
          {
            path: 'step',
            meta: {
              title: '分布表单',
            },
            name: `${BASE_ROUTE}_step_form`,
            component: () => import('@/pages/Components/StepForm/index.vue'),
          },
        ],
      },

      {
        path: 'editor',
        meta: {
          title: '编辑器',
        },
        name: `${BASE_ROUTE}_editor`,
        component: () => import('@/pages/Components/Editor/index.vue'),
      },
      {
        path: 'charts',
        meta: {
          title: '图表',
        },
        name: `${BASE_ROUTE}_chart`,
        component: () => import('@/pages/Components/Charts/index.vue'),
      },
      {
        path: 'upload',
        meta: {
          title: '文件上传',
        },
        name: `${BASE_ROUTE}_upload`,
        component: () => import('@/pages/Components/Upload/index.vue'),
      },
    ],
  },
]

export default ComponentsRoutes
