import { NavMode } from '../store/projectSetting'
import { AnimateType } from './animateSetting'

export const projectSetting = {
  navMode: 'vertical' as NavMode,
  navTheme: 'lighter',
  permissionMode: 'front',
  isPageAnimate: true,
  pageAnimateType: 'zoom-fade' as AnimateType,
  headerSetting: {
    gbColor: '#fff',
    fixed: true,
    isReload: true,
  },
}
