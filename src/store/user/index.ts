import { defineStore } from 'pinia'
import { UserInfo } from '@/types'
import UserAvatar from '@/assets/user/avatar.gif'

export const useUserStore = defineStore('user', {
  state: () => ({
    userinfo: {
      avatar: UserAvatar,
      username: 'admin',
      post: '前端工程师',
      belong: '阿里巴巴-达摩院',
    },
  }),
  getters: {
    getUserinfo: state => state.userinfo,
  },
  actions: {
    setUserinfo(userinfo: UserInfo) {
      this.userinfo = { ...this.userinfo, ...userinfo }
    },
  },
})
