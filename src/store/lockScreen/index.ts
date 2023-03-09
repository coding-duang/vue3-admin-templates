import { defineStore } from 'pinia'
import { bgImages } from '@/settings'

export const useLockStore = defineStore('lock', {
  state: () => ({
    index: 0,
    lockPassword: '123456',
    isLocked: false,
  }),
  getters: {
    getBgImage: state => bgImages[state.index],
    getPassword: state => state.lockPassword,
    getIsLocked: state => state.isLocked,
  },
  actions: {
    setIndex() {
      if (this.index > 6) {
        this.index = 0
        return
      }
      this.index++
    },
    setIsLocked(_switch: boolean) {
      this.isLocked = _switch
    },
    setPassword(password: string | number) {
      this.lockPassword = password
    },
  },
})
