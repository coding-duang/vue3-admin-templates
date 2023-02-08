import { Editor } from '@wangeditor/editor-for-vue'
import { defineProps, PropType } from 'vue'
import type {
  IDomEditor,
  IEditorConfig,
  IToolbarConfig,
} from '@wangeditor/editor'

export type EditorType = typeof Editor
export type EditorConfigType = Partial<IEditorConfig>
export type ToolbarConfigType = Partial<IToolbarConfig>

export const EditorProps = defineProps({
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
})
