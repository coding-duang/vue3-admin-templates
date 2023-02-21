import { Editor } from '@wangeditor/editor-for-vue'
import { PropType } from 'vue'
import type {
  IDomEditor,
  IEditorConfig,
  IToolbarConfig,
} from '@wangeditor/editor'

export type EditorType = typeof Editor
export type EditorConfigType = Partial<IEditorConfig>
export type ToolbarConfigType = Partial<IToolbarConfig>
export type Callbacks = {
  onBlur: (editor: EditorType) => void
  onFocus: (editor: EditorType) => void
  onChange: (editor: EditorType) => void
  customAlert: (info: string, type: string) => void
  customPaste: (editor: EditorType, event: Event) => void
  onDestroyed: (editor: EditorType) => void
}

const callbacksFn = (callbacks?: Partial<Callbacks>): Callbacks => {
  const haveCallbacks = (key: keyof Callbacks): boolean =>
    !!(callbacks && callbacks[key])

  console.log(haveCallbacks('onChange'))
  const onChange = haveCallbacks('onChange')
    ? callbacks.onChange
    : (editor: EditorType) => {
        console.log('change:', editor.getHtml())
      }
  const onDestroyed = haveCallbacks('onDestroyed')
    ? callbacks.onDestroyed
    : (editor: EditorType) => {
        console.log('destroyed', editor)
      }
  const onFocus = haveCallbacks('onFocus')
    ? callbacks.onFocus
    : (editor: EditorType) => {
        console.log('focus', editor)
      }
  const onBlur = haveCallbacks('onBlur')
    ? callbacks.onBlur
    : (editor: EditorType) => {
        console.log('blur', editor)
      }
  const customAlert = haveCallbacks('customAlert')
    ? callbacks.customAlert
    : (info: string, type: string) => {
        alert(`【自定义提示】${type} - ${info}`)
      }
  const customPaste = haveCallbacks('customPaste')
    ? callbacks.customPaste
    : (editor: EditorType, event: Event) => {
        console.log('ClipboardEvent 粘贴事件对象', event)

        // 自定义插入内容
        editor.insertText('xxx')

        // 返回值（注意，vue 事件的返回值，不能用 return）
        // callback(true) // 返回 true ，继续默认的粘贴行为
      }

  return {
    onChange,
    onDestroyed,
    onFocus,
    onBlur,
    customAlert,
    customPaste,
  }
}

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
    type: String,
  },
  editorStyle: {
    type: String,
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
  callbacks: {
    type: Object as PropType<Callbacks>,
    default: () => callbacksFn(),
  },
}
