import { IRegisterMenuConf } from '@wangeditor/core'
import { DOMElement } from '@wangeditor/core/dist/core/src/utils/dom'
import { IDomEditor, IModalMenu, SlateNode } from '@wangeditor/editor'

class PreviewMDConf implements IModalMenu {
  mark = 'preview_md'
  title = '预览'
  tag = 'button'
  showModal = true
  modalWidth = 860
  modal: DOMElement = null

  getValue(editor: IDomEditor): string | boolean {
    return ''
  }

  isActive(editor: IDomEditor): boolean {
    return false
  }

  isDisabled(editor: IDomEditor): boolean {
    return false
  }

  exec(editor: IDomEditor, value: string | boolean) {}

  getModalPositionNode(editor: IDomEditor): SlateNode | null {
    return null
  }

  getModalContentElem(editor: IDomEditor): DOMElement {
    const dialog = document.createElement('div')
    return dialog
  }
}

export const PreviewConf: IRegisterMenuConf = {
  key: 'previewMd',
  factory() {
    return new PreviewMDConf()
  },
}
