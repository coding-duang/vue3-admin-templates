import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'
import { useUserStore } from '../user'
import { getRemote } from '@/http'
import router from '@/router'
import { baseRoutes } from '@/router/base'
import {
  findRootPathRoute,
  flatRoutes,
  originToLocalRoutes,
} from '@/router/guard/utils'

export const useAuthRoutesStore = defineStore('auth', {
  state: () => ({
    authRoutes: [] as RouteRecordRaw[],
  }),
  getters: {
    getAuthSideBar(state) {
      return state.authRoutes.filter(route => route.meta && !route.meta.hidden)
    },
    isEmptyAuthRoutes(state) {
      return state.authRoutes.length === 0
    },
  },
  actions: {
    async getRoutes(data: { userId: number; roleId: number }) {
      try {
        const { data: originRoutes } = await getRemote.getOriginRoutes(data)

        return originToLocalRoutes(originRoutes)
      } catch (error) {
        console.error('获取路由失败')
      }
    },
    async initAuthRoutes() {
      const userStore = useUserStore()

      try {
        const originRoutes = await this.getRoutes({
          userId: userStore.userinfo.userId,
          roleId: userStore.userinfo.roleId,
        })

        const mapRoutes = flatRoutes(originRoutes)

        mapRoutes.forEach(route => {
          router.addRoute(route)
        })

        router.addRoute({
          path: '/',
          redirect: findRootPathRoute(originRoutes),
          meta: {
            title: '',
            hidden: true,
          },
        })

        router.addRoute({
          path: '/:path(.*)*',
          redirect: '/404',
          meta: {
            title: '',
            hidden: true,
          },
        })

        this.authRoutes = [...baseRoutes, ...originRoutes]
      } catch (error) {}
    },
  },
})
