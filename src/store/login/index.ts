import { defineStore } from 'pinia'

export const useLoginStore = defineStore({
  id: 'LoginState',
  state: () => {
    return {
      sendCodeAccount: '',
      isAgree: false,
    }
  },
  getters: {
    getIsAgree: state => state.isAgree,
  },
})
