import { storeToRefs } from 'pinia'
import { useProjectSettingStore } from '@/store'

export const useProjectSetting = () => {
  const projectSettingStore = useProjectSettingStore()
  const {
    getNavMode,
    getPermissionMode,
    getIsPageAnimate,
    getNavTheme,
    getPageAnimateType,
  } = storeToRefs(projectSettingStore)

  return {
    getNavMode,
    getPermissionMode,
    getIsPageAnimate,
    getNavTheme,
    getPageAnimateType,
    projectSettingStore,
  }
}
