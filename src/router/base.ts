import { RouteRecordRaw } from 'vue-router'
import { PageEnum } from '@/enum'
import AppLayout from '@/layout/AppLayout/index.vue'
import ErrorPage from '@/pages/ErrorPage/404/index.vue'

export const ErrorRoute: RouteRecordRaw = {
  path: '/:path(.*)*',
  name: PageEnum.ERROR_NAME,
  component: AppLayout,
  meta: {
    title: 'ErrorPage',
  },
  children: [
    {
      path: '/:path(.*)*',
      name: PageEnum.ERROR_NAME + 'son',
      component: ErrorPage,
      meta: {
        title: 'ErrorPage',
      },
    },
  ],
}

export const RedirectRoute: RouteRecordRaw = {
  path: '/redirect',
  name: PageEnum.REDIRECT_NAME,
  component: AppLayout,
  meta: {
    title: PageEnum.REDIRECT_NAME,
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: PageEnum.REDIRECT_NAME,
      component: () => import('@/pages/Redirect/index.vue'),
      meta: {
        title: PageEnum.REDIRECT_NAME,
      },
    },
  ],
}
