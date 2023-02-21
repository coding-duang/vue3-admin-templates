import { IModuleConf, IRegisterMenuConf } from '@wangeditor/core'
import { Boot } from '@wangeditor/editor'

export function registerPlugins(plugins: IRegisterMenuConf[]) {
  // bug fix: editor menu key repeat
  try {
    plugins.forEach(plugin => {
      if (hasMenuKey(plugin.key)) return
      Boot.registerMenu(plugin)
    })
  } catch (e) {
    // console.info(e)
  }
}
export function registerModules(menus: IRegisterMenuConf[]) {
  try {
    const module: Partial<IModuleConf> = {
      menus,
    }
    Boot.registerModule(module)
  } catch (e) {
    // console.info(e)
  }
}

function hasMenuKey(key: string) {
  return Boot.toolbarConfig.toolbarKeys.includes(key)
}
