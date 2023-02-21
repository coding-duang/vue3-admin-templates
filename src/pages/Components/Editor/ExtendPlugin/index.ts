import { registerPlugins, registerModules } from '@/utils'
import { IRegisterMenuConf } from '@wangeditor/core'
import { ExportFileConf } from './ExportFile'
// 暂时没想好设计
// import { PreviewConf } from './Preview'

export const modules = [ExportFileConf]

export const plugins: IRegisterMenuConf[] = []

export const initModules = () => {
  registerModules(modules)
}

export const initPlugins = () => {
  registerPlugins(plugins)
}

export * from './ExportFile'
export * from './Preview'
