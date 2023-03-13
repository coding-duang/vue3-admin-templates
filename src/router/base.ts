import { RouteRecordRaw } from 'vue-router'
import ErrorPage from '@/pages/ErrorPage/404/index.vue'
import LoginRoutes from './modules/login'

import Login from '@/pages/Login/index.vue'
import { getToken } from '@/utils'

// export const ErrorRoute: RouteRecordRaw = {
// path: '/:path(.*)*',
// name: PageEnum.ERROR_NAME,
// component: ErrorPage,
// meta: {
//   title: 'ErrorPage',
// },
// children: [
//   {
//     path: '/:path(.*)*',
//     name: PageEnum.ERROR_NAME + 'son',
//     component: ErrorPage,
//     meta: {
//       title: 'ErrorPage',
//     },
//   },
// ],
// }

// export const RedirectRoute: RouteRecordRaw = {
//   path: '/redirect',
//   name: PageEnum.REDIRECT_NAME,
//   component: AppLayout,
//   meta: {
//     title: PageEnum.REDIRECT_NAME,
//   },
//   children: [
//     {
//       path: '/redirect/:path(.*)',
//       name: PageEnum.REDIRECT_NAME,
//       component: () => import('@/pages/Redirect/index.vue'),
//       meta: {
//         title: PageEnum.REDIRECT_NAME,
//       },
//     },
//   ],
// }

export const baseRoutes: RouteRecordRaw[] = [
  // {
  //   path: '/personal',
  //   name: 'personal',
  //   component: AppLayout,
  //   meta: {
  //     title: '个人中心',
  //     hidden: true,
  //   },
  //   children: [
  //     {
  //       path: 'info',
  //       component: () => import('@/views/personal/index.vue'),
  //       meta: {
  //         title: '个人中心',
  //       },
  //     },
  //   ],
  // },
  {
    path: '/redirect',
    component: () => import('@/layout/AppLayout/index.vue'),
    meta: {
      title: '重定向',
      hidden: true,
    },
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'Redirect',
        component: () => import('@/pages/Redirect/index.vue'),
        meta: {
          hidden: true,
          title: '重定向',
        },
      },
    ],
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/pages/ErrorPage/403/index.vue'),
    meta: {
      title: '403',
      hidden: true,
    },
  },
  {
    path: '/500',
    name: '500',
    component: () => import('@/pages/ErrorPage/500/index.vue'),
    meta: {
      title: '500',
      hidden: true,
    },
  },
  {
    path: '/404',
    name: 'ErrorPage',
    component: ErrorPage,
    meta: {
      title: 'ErrorPage',
      hidden: true,
    },
  },
  {
    path: window.location.hash.replace('#', '') || window.location.pathname,
    name: 'defaultRouteName',
    component: () => import('@/pages/Redirect/DefaultRoute.vue'),
    meta: {
      title: '',
      hidden: true,
      noShowTabbar: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    redirect: '/login/sign-in',
    component: Login,
    children: LoginRoutes,
    meta: {
      hidden: true,
      title: '登录',
    },
    beforeEnter: (to, from, next) => {
      const fromPath = from.path

      if (!getToken()) {
        return next()
      }

      const loginPaths = ['/login/sign-in', '/login/sign-up', '/login']

      if (loginPaths.includes(fromPath)) {
        return next('/dashboard/work')
      }

      return next(fromPath)
    },
  },
]
