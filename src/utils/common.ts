import { h, Component } from 'vue'
import { NIcon } from 'naive-ui'

type FullscreenFn = (options?: {
  navigationUI?: 'auto' | 'hide' | 'show'
}) => Promise<void>

type Cores = {
  mozRequestFullScreen?: FullscreenFn
  webkitRequestFullscreen?: FullscreenFn
  msRequestFullscreen?: FullscreenFn
}

export const renderIcon = (icon: Component) => () =>
  h(NIcon, null, { default: () => h(icon) })

export const fullScreen = (ele: HTMLElement & Cores = document.body) => {
  if (ele.requestFullscreen) {
    ele.requestFullscreen()
  } else if (ele.mozRequestFullScreen) {
    ele.mozRequestFullScreen()
  } else if (ele.webkitRequestFullscreen) {
    ele.webkitRequestFullscreen()
  } else if (ele.msRequestFullscreen) {
    ele.msRequestFullscreen()
  }
}
