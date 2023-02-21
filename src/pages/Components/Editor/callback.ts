import { shallowRef } from 'vue'
import { EditorType } from './props'
import { Editor } from '@wangeditor/editor-for-vue'
import { IDomEditor } from '@wangeditor/editor'

export const useCallbacks = () => {
  const handleChange = (editor: EditorType) => {}
  const handleDestroyed = (editor: EditorType) => {}
  const handleFocus = (editor: EditorType) => {}
  const handleBlur = (editor: EditorType) => {}
  const customAlert = (info: string, type: string) => {}
  const customPaste = (editor: EditorType, event: Event) => {
    console.log('ClipboardEvent 粘贴事件对象', event)
    // 自定义插入内容
    editor.insertText('xxx')
    // 返回值（注意，vue 事件的返回值，不能用 return）
    // callback(true) // 返回 true ，继续默认的粘贴行为
  }

  return {
    handleChange,
    handleDestroyed,
    handleFocus,
    handleBlur,
    customAlert,
    customPaste,
  }
}
