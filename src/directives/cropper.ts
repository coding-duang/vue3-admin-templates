import { Directive, DirectiveBinding } from 'vue'
import { CustomScreenShot } from '@/object'
import ScreenShot from 'js-web-screen-shot'

interface CropperElType extends HTMLElement {
  options: Record<string, any>
  instance: ScreenShot
  handle: () => void
}

const cropper: Directive = {
  mounted(el: CropperElType, binding: DirectiveBinding) {
    const { value } = binding

    el.options = value
    const handle = () => {
      el.instance = CustomScreenShot.getInstance(el.options)
    }
    el.handle = handle
    el.addEventListener('click', el.handle)
  },
  updated(el: CropperElType, binding: DirectiveBinding) {
    el.options = binding.value
  },
  beforeUnmount(el: CropperElType) {
    el.removeEventListener('click', el.handle)
    // el.instance?.destroyComponents()
  },
}

export default cropper
