import { Directive, DirectiveBinding } from 'vue'
import { copyToClipboard } from '@/utils'

interface ElType extends HTMLElement {
  $value: string
  copyFn: (e: MouseEvent) => any
}

const copy: Directive = {
  mounted(el: ElType, binding: DirectiveBinding) {
    const { value } = binding
    el.$value = value
    el.copyFn = (e: MouseEvent) => {
      e.stopPropagation()
      copyToClipboard(el.$value)
    }
    el.addEventListener('click', el.copyFn)
  },
  updated(el: ElType, binding: DirectiveBinding) {
    const { value } = binding
    el.$value = value
  },
  beforeUnmount(el: ElType) {
    el.removeEventListener('click', el.copyFn)
  },
}

export default copy
