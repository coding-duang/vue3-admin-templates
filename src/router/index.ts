import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import AppLayout from '@/layout/AppLayout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '/',
        name: 'dashboard',
        component: () => import('@/pages/Dashboard/index.vue'),
      },
      {
        path: '/FlowChart',
        name: 'FlowChart',
        component: () => import('@/pages/FlowChart/index.vue'),
      },
      {
        path: '/404',
        name: 'notFound',
        component: () => import('@/pages/404/index.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach(() => {
  // todo
  return true
})

router.afterEach(() => {
  // todo
})

export default router
