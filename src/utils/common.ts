/* eslint-disable no-caller */
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

export function openWindow(
  url: string,
  opt?: {
    target?: '_self' | '_blank' | string
    noopener?: boolean
    noreferrer?: boolean
  }
) {
  const { target = '__blank', noopener = true, noreferrer = true } = opt || {}
  const feature: string[] = []

  noopener && feature.push('noopener=yes')
  noreferrer && feature.push('noreferrer=yes')

  window.open(url, target, feature.join(','))
}

// 判断HTML标签中是否有内容
export function hasContent(html: string) {
  const div = document.createElement('div')
  div.innerHTML = html
  const result = !!div.textContent.trim()
  div.remove()
  return result
}

export const frandom = (x: number, y: number) =>
  Math.floor(x + Math.random() * (y - x + 1))

export const sleep = (time: number = 2000) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(null)
    }, time)
  })
}

export function on(
  element: Element | HTMLElement | Document | Window,
  event: string,
  handler: (...args: any[]) => void
): void {
  if (element && event && handler) {
    element.addEventListener(event, handler, false)
  }
}

export function off(
  element: Element | HTMLElement | Document | Window,
  event: string,
  handler: (...args: any[]) => void
): void {
  if (element && event && handler) {
    element.removeEventListener(event, handler, false)
  }
}

export function once(
  el: HTMLElement,
  event: string,
  fn: (...args: any[]) => void
): void {
  const listener = function (this: any, ...args: unknown[]) {
    if (fn) {
      fn.apply(this, args)
    }
    off(el, event, listener)
  }
  on(el, event, listener)
}

export const getRandomColor = () => {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  return `rgb(${r}, ${g}, ${b})`
}
