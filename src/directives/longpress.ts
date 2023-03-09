import type { Directive, DirectiveBinding } from 'vue'

const longPress: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    if (typeof binding.value !== 'function') {
      // eslint-disable-next-line no-throw-literal
      throw 'callback必须是函数function'
    }
    let pressTimer: any = null

    const start = (e: any) => {
      if (e.button) {
        if (e.type === 'click' && e.button !== 0) {
          return
        }
      }
      if (pressTimer === null) {
        pressTimer = setTimeout(() => handler(e), 1000)
      }
    }

    const cancel = () => {
      if (pressTimer !== null) {
        clearTimeout(pressTimer)
        pressTimer = null
      }
    }

    const handler = (e: MouseEvent | TouchEvent) => binding.value(e)
    el.addEventListener('mousedown', start)
    el.addEventListener('touchstart', start)

    el.addEventListener('click', cancel)
    el.addEventListener('mouseout', cancel)
    el.addEventListener('touchend', cancel)
    el.addEventListener('touchcancel', cancel)
  },
}

export default longPress
