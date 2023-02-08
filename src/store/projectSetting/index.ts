import { defineStore } from 'pinia'
import { projectSetting, AnimateType } from '@/settings'

const { navMode, navTheme, permissionMode, isPageAnimate, pageAnimateType } =
  projectSetting

export type NavMode = 'horizontal' | 'vertical'

type ProjectSettingState = {
  navMode: NavMode // 导航模式
  navTheme: string // 导航风格
  permissionMode: string // 权限模式
  isPageAnimate: boolean // 是否开启路由动画
  pageAnimateType: AnimateType // 路由动画类型
}

export const useProjectSettingStore = defineStore('projectSetting', {
  state: (): ProjectSettingState => ({
    navMode,
    navTheme,
    permissionMode,
    isPageAnimate,
    pageAnimateType,
  }),
  getters: {
    getNavMode(): NavMode {
      return this.navMode
    },
    getNavTheme(): string {
      return this.navTheme
    },
    getPermissionMode(): string[] {
      return this.permissionMode
    },
    getIsPageAnimate(): boolean {
      return this.isPageAnimate
    },
    getPageAnimateType(): AnimateType {
      return this.pageAnimateType
    },
  },
  actions: {
    setNavMode(mode: NavMode) {
      this.navMode = mode
    },
    setIsPageAnimate(isAnimate: boolean) {
      this.isPageAnimate = isAnimate
    },
    setPageAnimateType(type: AnimateType) {
      this.pageAnimateType = type
    },
  },
})
