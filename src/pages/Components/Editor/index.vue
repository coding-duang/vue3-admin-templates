<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { useCallbacks } from './callback'
import {
  EditorProps as props,
  EditorConfigType,
  ToolbarConfigType,
  EditorType,
} from './props'
import { IDomEditor } from '@wangeditor/editor'

const editorRef = shallowRef()

const valueHtml = ref(props?.initHtml ?? '')

if (props?.initHtml) {
  setTimeout(() => {
    valueHtml.value = props.initHtml
  }, props?.showInitTextTimeout || 0)
}

const handleCreated = (editor: EditorType) => {
  editorRef.value = editor
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
  customAlert,
  customPaste,
  handleDestroyed,
} = useCallbacks()

onBeforeUnmount(() => {
  if (editorRef?.value?.destroy) editorRef.value.destroy()
})
</script>

<template>
  <div>
    <Toolbar
      :editor="editorRef"
      :defaultConfig="props?.toolbarConfig"
      :mode="props?.mode"
      :style="props?.toolbarStyle"
    />
    <Editor
      :defaultConfig="props?.editorConfig"
      :mode="props?.mode"
      v-model="valueHtml"
      :style="props?.editorStyle"
      @onCreated="handleCreated"
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
