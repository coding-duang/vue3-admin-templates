<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { onBeforeUnmount, ref, shallowRef, watch } from 'vue'
import {
  EditorProps,
  EditorConfigType,
  ToolbarConfigType,
  EditorType,
} from './props'

import { DomEditor, IToolbarConfig } from '@wangeditor/editor'
import { initEditorPlugins, modules, plugins } from './ExtendPlugin'
import EditorToolBar from './Toolbar/index.vue'

// 引入自定义样式
import './ExtendPlugin/ExportFile/index.scss'

// props
const props = defineProps(EditorProps)

// state
const editorRef = shallowRef()
const valueHtml = ref(props?.initHtml ?? '')

// toolbar config
const toolbarConfig = ref<Partial<IToolbarConfig>>({})

// watch
watch(
  () => editorRef.value,
  editor => {
    if (editor) {
      const keys = plugins
        .map(plugin => plugin.key)
        .concat(modules.map(module => module.key))

      toolbarConfig.value.insertKeys = {
        index: editor?.getAllMenuKeys?.()?.length + 1 || 0,
        keys: plugins
          .map(plugin => plugin.key)
          .concat(modules.map(module => module.key)),
      }
    }
  }
)

// methods
const onEditorCreated = (editor: EditorType) => {
  editorRef.value = editor

  setTimeout(() => {
    /* const toolbar = DomEditor?.getToolbar?.(editorRef.value) */
    /* const curToolbarConfig = toolbar?.getConfig() */
    /* const len = */
    /*   curToolbarConfig.toolbarKeys?.filter(key => key !== '|').length || 0 */
  })

  if (props?.editorProps) {
    editorRef.value.config = {
      ...editorRef.value?.getConfig?.(),
      ...props.editorProps,
    }
  }
}

// lifecycle
onBeforeUnmount(() => {
  if (editorRef?.value?.destroy) editorRef.value.destroy()
})

initEditorPlugins()

defineExpose({
  editorRef,
})
</script>

<template>
  <div class="editor_container" id="editor_container">
    <EditorToolBar
      v-if="editorRef"
      :editor-ref="editorRef"
      :toolbar-config="toolbarConfig"
    />
    <Editor
      :defaultConfig="props?.editorConfig"
      :mode="props?.mode"
      v-model="valueHtml"
      class="editor"
      :style="props?.editorStyle"
      @onCreated="onEditorCreated"
      @onChange="props.onChange"
      @onDestroyed="props.onDestroyed"
      @onFocus="props.onFocus"
      @onBlur="props.onBlur"
      @customAlert="props.customAlert"
      @customPaste="props.customPaste"
    />
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
