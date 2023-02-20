import { IModalMenu, IRegisterMenuConf } from '@wangeditor/core'
import { IDomEditor, SlateNode } from '@wangeditor/editor'
import { DOMElement } from '@wangeditor/editor/dist/editor/src/utils/dom'
import { getMD } from './Markdown'

import { defaultSelect } from './options'
import { getPng } from './Png'
const EDITOR_CONTAINER_ID = 'editor_export_container'
const EDITOR_FOOTER_ID = 'editor_export_footer'
const EDITOR_CONTENT_ID = 'editor_export_content'

class ExportFile implements IModalMenu {
  title = '导出'
  width = 60
  private _options = defaultSelect
  tag = 'button'
  showModal = true
  modalWidth = 860
  modal: DOMElement = null

  getValue(editor: IDomEditor): string | boolean {
    return this._options
  }

  getModalPositionNode(editor: IDomEditor): SlateNode | null {
    return null
  }

  isActive(editor: IDomEditor): boolean {
    return false
  }

  isDisabled(editor: IDomEditor): boolean {
    return false
  }

  exec(editor: IDomEditor, value: string | boolean) {}

  // 定义 modal 内部的 DOM Element
  getModalContentElem(editor: IDomEditor): DOMElement {
    return exportFileDialog(editor)
  }
}

export const ExportFileConf: IRegisterMenuConf = {
  key: 'exportFile',
  factory() {
    return new ExportFile()
  },
}

function exportFileDialog(editor: IDomEditor) {
  // 下拉选择框
  const select = document.createElement('select')
  select.innerHTML = `
    <option value="md">MD</option>
    <option value="html">HTML</option>
    <option value="png">PNG</option>
  `

  select.style.cursor = 'pointer'

  // 下拉选择框的值
  let selectValue = 'md'

  // 导出按钮
  const buttonGroup = document.createElement('div')
  buttonGroup.classList.add(EDITOR_FOOTER_ID)

  const exportButton = document.createElement('button')
  exportButton.innerHTML = '导出'
  exportButton.addEventListener('click', () => {
    // 导出
    exportFile(selectValue)
  })

  const copyButton = document.createElement('button')
  copyButton.innerHTML = '复制'
  copyButton.addEventListener('click', () => {
    // 复制
    // TODO: 复制到剪贴板
    console.log('copy to clipboard')
  })
  buttonGroup.append(exportButton, copyButton)

  // 导出对话框
  const dialog = document.createElement('div')
  dialog.classList.add(EDITOR_CONTAINER_ID)

  // 导出对话框的内容

  const contentElem = document.createElement('div')
  contentElem.classList.add(EDITOR_CONTENT_ID, 'w-e-text-container')

  setContent(editor, selectValue, contentElem)

  // 下拉选择框的值改变时
  select.addEventListener('change', e => {
    selectValue = (e.target as HTMLSelectElement).value

    // TODO: 根据选择的值，改变对话框的内容
    setContent(editor, selectValue, contentElem)
  })

  dialog.append(select, contentElem, buttonGroup)

  return dialog
}

function setContent(editor: IDomEditor, type: string, contentElem: DOMElement) {
  switch (type) {
    case 'md': {
      const txt = getMD(editor.getHtml(), contentElem as HTMLElement)
      break
    }
    case 'png': {
      getPng(editor.getHtml(), contentElem as HTMLElement)
      break
    }
    case 'html': {
      contentElem.innerHTML = ''
      const textarea = document.createElement('textarea')
      textarea.readOnly = true
      textarea.value = editor.getHtml()

      contentElem.append(textarea)
      break
    }
    default: {
      console.log('setContent', type)
      contentElem.innerHTML = ''
    }
  }
}

function exportFile(type: string) {
  console.log('exportFile', type)
}
