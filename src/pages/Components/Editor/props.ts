import { Editor } from '@wangeditor/editor-for-vue'
import { defineProps, PropType, CSSProperties } from 'vue'
import type {
  IDomEditor,
  IEditorConfig,
  IToolbarConfig,
} from '@wangeditor/editor'

export type EditorType = typeof Editor
export type EditorConfigType = Partial<IEditorConfig>
export type ToolbarConfigType = Partial<IToolbarConfig>

export const EditorProps = {
  initHtml: {
    type: String,
    default: '',
  },
  showInitTextTimeout: {
    type: Number,
  },
  toolbarConfig: {
    type: Object as PropType<ToolbarConfigType>,
    default: () => ({}),
  },
  toolbarStyle: {
    type: Object,
    default: () => ({}),
  },
  editorStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => ({}),
  },
  editorConfig: {
    type: Object as PropType<EditorConfigType>,
    default: () => ({}),
  },
  mode: {
    type: String,
    default: 'default',
  },
  editorProps: {
    type: Object as PropType<IDomEditor>,
  },
  onChange: {
    type: Function as PropType<(editor: EditorType) => void>,
    default: (editor: EditorType) => {
      console.log('change:', editor.getHtml())
    },
  },
  onDestroyed: {
    type: Function as PropType<(editor: EditorType) => void>,
    default: (editor: EditorType) => {
      console.log('destroyed', editor)
    },
  },
  onFocus: {
    type: Function as PropType<(editor: EditorType) => void>,
    default: (editor: EditorType) => {
      console.log('focus', editor)
    },
  },
  onBlur: {
    type: Function as PropType<(editor: EditorType) => void>,
    default: (editor: EditorType) => {
      console.log('blur', editor)
    },
  },
  customAlert: {
    type: Function as PropType<(info: string, type: string) => void>,
    default: (info: string, type: string) => {
      console.log(`【自定义提示】${type} - ${info}`)
    },
  },
  customPaste: {
    type: Function as PropType<(editor: EditorType, event: Event) => void>,
    default: (editor: EditorType, event: Event) => {
      console.log('ClipboardEvent 粘贴事件对象', event)
      // 自定义插入内容
      editor.insertText('xxx')
      // 返回值（注意，vue 事件的返回值，不能用 return）
      // callback(true) // 返回 true ，继续默认的粘贴行为
    },
  },
  hideToolbar: {
    type: Boolean,
    default: false,
  },
}
