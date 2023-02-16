import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import { setupNaiveUI } from './utils'
import '@/mock'

const setupApp = () => {
  const app = createApp(App)
  app.use(createPinia())
  setupNaiveUI(app)
  app.use(router).mount('#app')
}

setupApp()
