<script setup lang="ts">
// imports
import { DomEditor, IToolbarConfig } from '@wangeditor/editor'
import { Editor } from '@wangeditor/editor-for-vue'
import { onBeforeUnmount, ref, shallowRef, watch, computed } from 'vue'

import { useCallbacks } from './callback'
import { EditorProps as props, EditorType } from './props'

import { initModules, initPlugins, modules, plugins } from './ExtendPlugin'
import EditorToolBar from './Toolbar/index.vue'

import '@wangeditor/editor/dist/css/style.css'
// 引入自定义样式
import './ExtendPlugin/ExportFile/index.scss'

// state
const editorRef = shallowRef()
const valueHtml = ref(props?.initHtml ?? '')

const initEditorPlugins = () => {
  initModules()
  initPlugins()
}

initEditorPlugins()

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

      // get toolbar height
      const toolbar = DomEditor?.getToolbar?.(editor)
      console.log('toolbar --> ', toolbar)
    }
  }
)

// methods
const onEditorCreated = (editor: EditorType) => {
  editorRef.value = editor

  // get toolbar config
  setTimeout(() => {
    const toolbar = DomEditor?.getToolbar?.(editorRef.value)
    const curToolbarConfig = toolbar?.getConfig()

    const len =
      curToolbarConfig.toolbarKeys?.filter(key => key !== '|').length || 0

    console.log('curToolbarConfig --> ', curToolbarConfig)
  })

  if (props?.editorProps) {
    editorRef.value.config = {
      ...editorRef.value?.getConfig?.(),
      ...props.editorProps,
    }
  }
}

const {
  handleBlur,
  handleFocus,
  handleChange,
  handleDestroyed,
  customAlert,
  customPaste,
} = useCallbacks()

// lifecycle
onBeforeUnmount(() => {
  if (editorRef?.value?.destroy) editorRef.value.destroy()
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
      @onChange="handleChange"
      @onDestroyed="handleDestroyed"
      @onFocus="handleFocus"
      @onBlur="handleBlur"
      @customAlert="customAlert"
      @customPaste="customPaste"
    />
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
