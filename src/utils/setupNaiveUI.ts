import { App, Directive } from 'vue'
import {
  create,
  NLoadingBarProvider,
  NMessageProvider,
  NDialogProvider,
  NNotificationProvider,
} from 'naive-ui'

const getDirectives = () => {
  const modules = import.meta.glob('../directives/**/*.ts', { eager: true })
  const directives: Record<string, Directive> = {}

  Object.keys(modules).forEach(dir => {
    const name = dir.split('/').pop()
    const key = name.substring(0, name.length - 3)
    const mod = ((modules[dir] as any).default as Directive) || {}
    directives[key] = mod
  })

  return directives
}

export const setupDirective = (app: App) => {
  const directives = getDirectives()
  Object.entries(directives).forEach(([key, value]) => {
    app.directive(key, value)
  })
}

export const setupNaiveUI = (app: App) => {
  const common = create({
    components: [
      NLoadingBarProvider,
      NMessageProvider,
      NDialogProvider,
      NNotificationProvider,
    ],
  })
  app.use(common)
}
