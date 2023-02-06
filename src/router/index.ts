import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import AppLayout from '@/layout/AppLayout/index.vue'
import LayoutRedirect from '@/layout/LayoutRedirect.vue'
import { createDiscreteApi } from 'naive-ui'
import { componentsRoutes } from './components'

const { loadingBar } = createDiscreteApi(['loadingBar'])

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/console',
        component: LayoutRedirect,
        children: [
          {
            path: '/console',
            name: 'console',
            component: () => import('@/pages/Dashboard/index.vue'),
          },
        ],
      },
      ...componentsRoutes,
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
  loadingBar.start()
  // todo
  return true
})

router.afterEach(() => {
  // todo
  loadingBar.finish()
})

export default router
