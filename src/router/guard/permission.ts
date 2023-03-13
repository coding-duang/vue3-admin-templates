import router from '../index'
import { whiteRoutes } from './utils'
import { createDiscreteApi } from 'naive-ui'
import { useUserStore, useAuthRoutesStore } from '@/store'

const { loadingBar } = createDiscreteApi(['loadingBar'])

const usePermissionGuard = () => {
  router.beforeEach(async (to, from, next) => {
    to.name !== 'defaultRouteName' && loadingBar.start()

    const userStore = useUserStore()
    const authStore = useAuthRoutesStore()

    const isWhiteRoute = () => {
      return whiteRoutes.find(
        item => item.path === to.path && item.name !== 'defaultRouteName'
      )
    }

    isWhiteRoute() && next()

    const isLogin = to.path.indexOf('/login') < 0 && userStore.isTokenExpire
    if (isLogin) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      })
      return false
    }

    authStore.isEmptyAuthRoutes && (await authStore.initAuthRoutes())

    next()
  })
}

router.afterEach(() => {
  // todo
  loadingBar.finish()
})

export default usePermissionGuard
