import { h, Component } from 'vue'
import { NIcon, createDiscreteApi } from 'naive-ui'

type FullscreenFn = (options?: {
  navigationUI?: 'auto' | 'hide' | 'show'
}) => Promise<void>

type Cores = {
  mozRequestFullScreen?: FullscreenFn
  webkitRequestFullscreen?: FullscreenFn
  msRequestFullscreen?: FullscreenFn
}

const { message } = createDiscreteApi(['message'])

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

// 彩色输出console.log
export class Log {
  static error = (msg: string) => {
    console.log(`%c ${msg}`, 'color: red')
  }

  static success = (msg: string) => {
    console.log(`%c ${msg}`, 'color: green')
  }

  static warn = (msg: string) => {
    console.log(`%c ${msg}`, 'color: yellow')
  }

  // 多个参数
  static info = (...msg: string[]) => {
    // 遍历判断是否是对象，是对象就转换成json字符串
    msg.forEach((item, index) => {
      msg[index] = this.stringify(item)
    })
    console.log(`%c ${msg}`, 'color: blue')
  }

  static log = (msg: string) => {
    console.log(`%c ${msg}`, 'color: black')
  }

  // https://developer.mozilla.org/zh-CN/docs/Web/API/console/table
  static table = (msg: any) => {
    console.table(msg)
  }

  static stringify(msg: any) {
    if (typeof msg === 'object') {
      return JSON.stringify(msg)
    }
    return msg
  }
}

// copy from modal
export function copyToClipboard(
  text: string,
  parent: HTMLElement = document.body
) {
  try {
    const input = document.createElement('input')

    input.value = text
    parent.append(input)

    input.select()
    document.execCommand('copy')

    parent.removeChild(input)
    message.success('复制成功')
  } catch (error) {
    Log.error(error)
    message.error('复制失败')
  }
}
