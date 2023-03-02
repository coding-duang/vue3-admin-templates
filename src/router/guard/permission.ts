import router from '../index'
import { whiteRoutes } from './utils'
import { createDiscreteApi } from 'naive-ui'
import { useUserStore, useAuthRoutesStore } from '@/store'

const { loadingBar } = createDiscreteApi(['loadingBar'])

const usePermissionGuard = () => {
  router.beforeEach(async to => {
    to.name !== 'defaultRouteName' && loadingBar.start()

    const userStore = useUserStore()
    const authStore = useAuthRoutesStore()

    const isWhiteRoute = () => {
      return whiteRoutes.find(
        item => item.path === to.path && item.name !== 'defaultRouteName'
      )
    }

    if (isWhiteRoute()) {
      return true
    }

    if (userStore.isTokenExpire) {
      return {
        path: '/login',
        query: { redirect: to.fullPath },
      }
    }

    if (authStore.isEmptyAuthRoutes) {
      await authStore.initAuthRoutes()
    }

    return true
  })
}

router.afterEach(() => {
  // todo
  loadingBar.finish()
})

export default usePermissionGuard
