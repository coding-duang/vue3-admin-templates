import { baseRoutes as baseUrl } from '../base'
import { RouteRecordRaw } from 'vue-router'
import { OriginRoute, WhiteRoutes } from '@/types/auth'
import { resolve } from 'path-browserify'
import AppLayout from '@/layout/AppLayout/index.vue'

const getWhitelist = (routes: RouteRecordRaw[]) => {
  const whiteRoutes: Array<WhiteRoutes> = []
  routes.forEach(route => {
    if (route.children) {
      whiteRoutes.push(...getWhitelist(route.children))
    }
    whiteRoutes.push({
      path: route.path,
      name: route.name as string,
    })
  })
  return whiteRoutes
}

const getAllPages = () => {
  const loadComponents = import.meta.glob('/src/pages/**/*.vue')
  const allComponents: Record<string, () => Promise<unknown>> = {}
  for (const key in loadComponents) {
    allComponents[key.toLowerCase()] = loadComponents[key]
  }
  return allComponents
}

export const localFilePathToLowerCase = (originRoute: OriginRoute[]) => {
  return originRoute.map(
    item => (item.localFilePath = item.localFilePath.toLowerCase())
  )
}

export const flatRoutes = (srcRoutes: RouteRecordRaw[]) => {
  function addParentRoute(routes: any, parent: any, parentPath: string) {
    routes.forEach((it: RouteRecordRaw) => {
      if (!isExternal(it.path)) {
        it.path = resolve(parentPath, it.path)
      }
      parent.push(it)
      if (it.children && it.children.length > 0) {
        addParentRoute(it.children, parent, it.path)
      }
    })
  }
  if (srcRoutes && srcRoutes.length > 0) {
    const tempRoutes = [] as Array<any>
    srcRoutes.forEach(it => {
      const route = { ...it }
      const parentRoutes = [] as Array<any>
      if (route.children && route.children.length > 0) {
        addParentRoute(route.children, parentRoutes, route.path)
      }
      parentRoutes && parentRoutes.length > 0 && (route.children = parentRoutes)
      tempRoutes.push(route)
    })
    return tempRoutes
  }
  return []
}

export const isMenu = (item: OriginRoute) => {
  return item.children && item.children.length > 0
}

export const isExternal = (path: string) => {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export const strMontage = (str: string, flag: string) => {
  const temp = str.split('/')
  let result = ''
  temp.forEach(item => {
    item &&
      (result ? (result += `${flag}${item}`) : (result += `${result}${item}`))
  })
  return result
}

const getComponent = (item: OriginRoute) => {
  if (!item.localFilePath) item.localFilePath = item.menuUrl
  item.localFilePath = resolve('/', item.localFilePath)
  const finalPath = '/src/pages' + item.localFilePath + '.vue'

  return allComponents[finalPath]
}

export const originToLocalRoutes = (originRoutes: OriginRoute[]) => {
  const tempRoutes: Array<RouteRecordRaw> = []
  originRoutes.forEach(route => {
    const isMenuFlag = isMenu(route)

    const routed: RouteRecordRaw = {
      path:
        route.outLink && isExternal(route.outLink)
          ? route.outLink
          : route.menuUrl,
      name: route.routeName || strMontage(route.menuUrl, '_'),
      component: isMenuFlag
        ? route.parentPath
          ? null
          : AppLayout
        : getComponent(route),
      meta: {
        hidden: !!route.hidden, // false：侧边导航栏  true：非导航栏页面
        title: route.menuName, // 标题
        affix: !!route.affix, // 不可关闭的缓存页面
        cacheable: !!route.cacheable, // 页面是否缓存（可以通过后台配置）
        icon: route.icon || 'icon-menu', // 页面图标
        isRootPath: !!route.isRootPath, // 访问 / 目录时跳转的页面
        isSingle: !!route.isSingle, // 是否为单层菜单
      },
    }
    route.children &&
      ((routed as RouteRecordRaw).children = originToLocalRoutes(
        route.children
      ))
    tempRoutes.push(routed)
  })
  return tempRoutes
}

export function findRootPathRoute(routes: RouteRecordRaw[]) {
  for (let index = 0; index < routes.length; index++) {
    const route = routes[index]
    const rootRoute = route.children?.find(it => it.meta && it.meta.isRootPath)
    if (rootRoute) {
      return rootRoute.path
    }
  }
  return routes &&
    routes.length > 0 &&
    routes[0].children &&
    routes[0].children.length > 0
    ? routes[0].children![0].path
    : '/'
}

export const allComponents = getAllPages()

export const whiteRoutes = getWhitelist(baseUrl)
