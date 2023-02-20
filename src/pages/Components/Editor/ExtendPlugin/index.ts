import { registerPlugins, registerModules } from '@/utils'
import { IRegisterMenuConf } from '@wangeditor/core'
import { ExportFileConf } from './ExportFile'
import { PreviewConf } from './Preview'

export const modules = [ExportFileConf, PreviewConf]

export const plugins: IRegisterMenuConf[] = []

export const initModules = () => {
  registerModules(modules)
}

export const initPlugins = () => {
  registerPlugins(plugins)
}

export * from './ExportFile'
export * from './Preview'
