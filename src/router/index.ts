import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { createDiscreteApi } from 'naive-ui'
import { PageEnum } from '@/enum'
import { baseRoutes } from './base'
import usePermissionGuard from './guard/permission'

const { loadingBar } = createDiscreteApi(['loadingBar'])

const getDynamicRoutes = () => {
  const modules = import.meta.glob('./modules/**/*.ts', { eager: true })
  const routeModuleList: RouteRecordRaw[] = []

  Object.keys(modules).forEach(_module => {
    const mod = (modules[_module] as any).default || {}
    const modList = Array.isArray(mod) ? [...mod] : [mod]
    routeModuleList.push(...modList)
  })

  return routeModuleList
}

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   name: 'Root',
  //   redirect: PageEnum.HOME_PATH,
  //   meta: {
  //     title: 'Root',
  //   },
  // },
  // ErrorRoute,
  // RedirectRoute,
  // ...getDynamicRoutes(),
  // TODO: 添加错误路由
  ...baseRoutes,
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default router
