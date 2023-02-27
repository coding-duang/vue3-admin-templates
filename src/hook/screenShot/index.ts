import { ref, onMounted, onBeforeUnmount } from 'vue'
import { CustomScreenShot } from '@/object'
import ScreenShot from 'js-web-screen-shot'
// @ts-ignore
import { screenShotType } from 'js-web-screen-shot/dist/type/lib/ComponentType'

export const useScreenShot = (options?: screenShotType) => {
  const screenShotRef = ref<ScreenShot | null>(null)

  onMounted(() => {
    screenShotRef.value = CustomScreenShot.getInstance(options)
  })

  onBeforeUnmount(() => screenShotRef.value?.destroyComponents())

  return {
    screenShotRef,
  }
}
