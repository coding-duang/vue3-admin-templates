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
        meta: {
          title: '表单',
        },
        redirect: `/${BASE_ROUTE}/form/basic`,
        component: SubLayout,
        children: [
          {
            path: 'basic',
            name: `${BASE_ROUTE}_basic_form`,
            component: () =>
              import('@/pages/Components/Form/BasicForm/index.vue'),
          },
          {
            path: 'step',
            name: `${BASE_ROUTE}_step_form`,
            component: () =>
              import('@/pages/Components/Form/StepForm/index.vue'),
          },
        ],
      },
      {
        path: 'flowChart',
        name: `${BASE_ROUTE}_flowChart`,
        component: () => import('@/pages/FlowChart/index.vue'),
        meta: {
          title: '流程图',
          permissions: [],
        },
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
    ],
  },
]

export default ComponentsRoutes
