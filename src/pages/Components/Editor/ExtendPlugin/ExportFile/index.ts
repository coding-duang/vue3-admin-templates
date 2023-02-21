import { IModalMenu, IRegisterMenuConf } from '@wangeditor/core'
import { IDomEditor, SlateNode } from '@wangeditor/editor'
import { DOMElement } from '@wangeditor/editor/dist/editor/src/utils/dom'
import { saveAs } from 'file-saver'

import { currentValue } from '@/types'
import { copyToClipboard } from '@/utils'
import { getMD } from './Markdown'
import { getPng } from './Png'

// constant
const EDITOR_CONTAINER_ID = 'editor_export_container'
const EDITOR_FOOTER_ID = 'editor_export_footer'
const EDITOR_CONTENT_ID = 'editor_export_content'

class ExportFile implements IModalMenu {
  title = '导出'
  tag = 'button'
  showModal = true
  modalWidth = 860
  modal: DOMElement = null

  getValue(editor: IDomEditor): string | boolean {
    return ''
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

  getModalContentElem(editor: IDomEditor): DOMElement {
    return exportFileDialog(editor)
  }
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

  // 保存用于复制和导出的内容
  // 导出对话框的内容
  const contentElem = document.createElement('div')
  contentElem.classList.add(EDITOR_CONTENT_ID, 'w-e-text-container')

  let currentValue = setDialogContent(editor, selectValue, contentElem)

  // 下拉选择框的值改变时
  select.addEventListener('change', e => {
    selectValue = (e.target as HTMLSelectElement).value
    // TODO: 根据选择的值，改变对话框的内容
    currentValue = setDialogContent(editor, selectValue, contentElem)
  })

  // 导出按钮
  const buttonGroup = document.createElement('div')
  buttonGroup.classList.add(EDITOR_FOOTER_ID)

  const exportButton = document.createElement('button')
  exportButton.innerHTML = '导出'
  exportButton.addEventListener('click', () => {
    // 导出
    exportFile(currentValue)
  })

  const copyButton = document.createElement('button')
  copyButton.innerHTML = '复制'

  copyButton.addEventListener('click', () => {
    // TODO: 复制content到剪贴板
    let value = ''

    if (currentValue.type === 'png') {
      value = (currentValue.content as HTMLCanvasElement).toDataURL('image/png')
    } else {
      value = currentValue.content
    }

    copyToClipboard(value)
  })
  buttonGroup.append(exportButton, copyButton)

  // 导出对话框
  const dialog = document.createElement('div')
  dialog.classList.add(EDITOR_CONTAINER_ID)

  dialog.append(select, contentElem, buttonGroup)

  return dialog
}

function setDialogContent(
  editor: IDomEditor,
  type: string,
  contentElem: DOMElement
) {
  const currentValue: currentValue = {
    type: null,
    content: null,
  }
  switch (type) {
    case 'md': {
      const txt = getMD(editor.getHtml(), contentElem as HTMLElement)
      currentValue.content = txt
      currentValue.type = 'md'
      break
    }
    case 'png': {
      getPng(editor.getHtml(), contentElem as HTMLElement).then(canvas => {
        currentValue.type = 'png'
        currentValue.content = canvas
      })
      break
    }
    case 'html': {
      contentElem.innerHTML = ''
      const textarea = document.createElement('textarea')
      textarea.readOnly = true
      currentValue.content = editor.getHtml()
      currentValue.type = 'html'
      textarea.value = currentValue.content

      contentElem.append(textarea)
      break
    }
    default: {
      console.log('setContent', type)
      contentElem.innerHTML = ''

      currentValue.content = ''
      currentValue.type = null
    }
  }

  return currentValue
}

function exportFile({ type, content }: currentValue) {
  switch (type) {
    case 'md': {
      const blob = new Blob([content], {
        type: 'text/markdown;charset=utf-8',
      })
      saveAs(blob, 'export.md')
      break
    }
    case 'png': {
      content.toBlob(blob => {
        saveAs(blob, 'export.png')
      })
      break
    }
    case 'html': {
      const blob = new Blob([content], {
        type: 'text/html;charset=utf-8',
      })
      saveAs(blob, 'export.html')
      break
    }
    default:
      console.log('exportFile', type)
      break
  }
}

export const ExportFileConf: IRegisterMenuConf = {
  key: 'exportFile',
  factory() {
    return new ExportFile()
  },
}
