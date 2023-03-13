import { defineStore } from 'pinia'
import { UserInfo } from '@/types'
import { getToken, clearToken } from '@/utils'
import UserAvatar from '@/assets/user/avatar.gif'

export const useUserStore = defineStore('user', {
  state: () => ({
    userinfo: {
      avatar: UserAvatar,
      username: 'admin',
      userId: 0,
      roleId: 0,
      token: getToken(),
      post: '前端工程师',
      belong: '阿里巴巴-达摩院',
    },
  }),
  getters: {
    getUserinfo: state => state.userinfo,
    isTokenExpire() {
      return !this.userinfo.token
    },
  },
  actions: {
    setUserinfo(userinfo: UserInfo) {
      this.userinfo = { ...this.userinfo, ...userinfo }
    },
    setToken(token: string) {
      this.userinfo.token = token
    },
    removeToken() {
      clearToken()
      this.userinfo.token = getToken()
    },
  },
})
