import { IRegisterMenuConf } from '@wangeditor/core'
import { IDomEditor, ISelectMenu, SlateTransforms } from '@wangeditor/editor'
import { defaultSelect, options } from './options'

class PreviewMDConf implements ISelectMenu {
  mark = 'preview_md'
  title = '预览MD'
  tag = 'select'
  width = 60
  private _options = defaultSelect

  getOptions(editor: IDomEditor) {
    const editorValue = this.getValue(editor)

    const showOptions = options.map(({ value, text }) => ({
      value,
      text,
      selected: value === editorValue,
    }))

    return showOptions
  }

  getValue(editor: IDomEditor): string | boolean {
    return this._options
  }

  isActive(editor: IDomEditor): boolean {
    return !!editor
  }

  isDisabled(editor: IDomEditor): boolean {
    return false
  }

  exec(editor: IDomEditor, value: string | boolean) {
    console.log('editor EXEC ==>', value)
    if (value === this._options) return

    const node = {
      type: 'paragraph',
      children: [{ text: '[[[test' }],
    }

    this._options = value

    SlateTransforms.insertNodes(editor, node)
  }
}

export const PreviewConf: IRegisterMenuConf = {
  key: 'previewMd',
  factory() {
    return new PreviewMDConf()
  },
}
