import { defineComponent } from 'vue'
import { RouteMeta, RouteRecordRaw } from 'vue-router'

export type Component<T extends any = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>)

export type CustomRouteRaw = RouteRecordRaw & {
  name?: string
  meta?: RouteMeta
  // component?: Component | string
  components?: Component
  children?: CustomRouteRaw[]
  props?: Record<string, any>
  fullpath?: string
}

export type Meta = {
  // 名称
  title: string
  // 是否忽略权限
  ignoreAuth?: boolean
  permissions?: string[]
  // 是否缓存
  isKeepAlive?: boolean
  // tab的icon
  icon?: string
  // 跳转地址
  frameSrc?: string
  // 外链跳转
  externalLink?: string
  // 隐藏
  hidden?: boolean
}

export type MenuOptionObj = {
  path: string,
  label: string,
  key: string,
  icon: Component,
  children?: MenuOptionObj[]
}
