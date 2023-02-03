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
        path: '/404',
        name: 'notFound',
        component: () => import('@/pages/404/index.vue'),
      },
      {
        path: '/form',
        name: 'basicForm',
        component: () => import('@/pages/BasicForm/index.vue'),
      },
      {
        path: '/stepForm',
        name: 'stepForm',
        component: () => import('@/pages/StepForm/index.vue')
      }

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
