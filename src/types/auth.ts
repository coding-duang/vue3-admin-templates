export type AuthCondition = {
  userId: number
  roleId: number
}

export interface OriginRoute {
  parentPath?: string
  menuUrl: string
  menuName?: string
  routeName?: string
  hidden?: boolean
  outLink?: string
  affix?: boolean
  cacheable?: boolean
  isRootPath?: boolean
  iconPrefix?: string
  icon?: string
  isSingle?: boolean
  localFilePath?: string
  children?: Array<OriginRoute>
}

export type WhiteRoutes = {
  path: string
  name: string
}
