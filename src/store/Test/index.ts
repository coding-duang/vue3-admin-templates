import { defineStore } from 'pinia'

const list = (): Promise<number[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([1, 2, 3, 4, 5])
    }, 2000)
  })
}

export const useTestStore = defineStore('test', {
  state: () => ({
    counter: 0,
    list: [],
  }),
  getters: {
    doubleCounter: state => state.counter * 2,
    doublePlusOne() {
      return this.doubleCounter + 1
    },
  },
  actions: {
    increment() {
      this.counter++
    },
    async getList() {
      try {
        this.list = await list()
      } catch (error) {
        throw new Error(error)
      }
    },
  },
})
