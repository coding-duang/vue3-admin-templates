import { defineStore } from 'pinia'

export const createDynamicStore = <S extends object>(
  storeId: string,
  state: S
) => {
  return defineStore(storeId, {
    state: (): S => state,
    getters: {
      getState() {
        return this.$state
      },
    },
    actions: {
      setState(state: S) {
        this.$state = { ...this.$state, ...state }
      },
    },
  })
}
