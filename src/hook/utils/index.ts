import { ref, onBeforeUnmount } from 'vue'

export const useInterval = (
  callback: (...args: any[]) => void,
  time: number = 5000
) => {
  const timer = ref<number | null>(null)
  timer.value = window?.setInterval(() => callback(), time)

  onBeforeUnmount(() => {
    timer.value = null
    window?.clearInterval(timer.value)
  })
}
