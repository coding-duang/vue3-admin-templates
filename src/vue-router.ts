import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    hidden?: boolean
    title?: string
    affix?: boolean
    cacheable?: boolean
    icon?: string
    isRootPath?: boolean
    isSingle?: boolean
  }
}
