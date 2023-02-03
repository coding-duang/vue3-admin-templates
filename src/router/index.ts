import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import AppLayout from '@/layout/AppLayout/index.vue'
import { createDiscreteApi } from 'naive-ui'

const { loadingBar } = createDiscreteApi(['loadingBar'])

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
  loadingBar.start()
  // todo
  return true
})

router.afterEach(() => {
  // todo
  loadingBar.finish()
})

export default router
