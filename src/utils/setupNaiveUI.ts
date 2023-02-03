import { App } from 'vue'
import {
  create,
  NLoadingBarProvider,
  NMessageProvider,
  NDialogProvider,
  NNotificationProvider,
} from 'naive-ui'

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
