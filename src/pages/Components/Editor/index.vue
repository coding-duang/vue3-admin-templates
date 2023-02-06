<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'

type EditorType = typeof Editor

// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('<p>hello</p>')

// 模拟 ajax 异步获取内容
onMounted(() => {
  setTimeout(() => {
    valueHtml.value = '<p>Demo one one ...</p>'
  }, 1500)
})

const mode = ref('default')
const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }

// 组件销毁时，也及时销毁编辑器，重要！
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return

  editor.destroy()
})

// 编辑器回调函数
const handleCreated = (editor: EditorType) => {
  console.log('created', editor)
  editorRef.value = editor // 记录 editor 实例，重要！
}
const handleChange = (editor: EditorType) => {
  console.log('change:', editor.getHtml())
}
const handleDestroyed = (editor: EditorType) => {
  console.log('destroyed', editor)
}
const handleFocus = (editor: EditorType) => {
  console.log('focus', editor)
}
const handleBlur = (editor: EditorType) => {
  console.log('blur', editor)
}
const customAlert = (info: string, type: string) => {
  alert(`【自定义提示】${type} - ${info}`)
}
const customPaste = (editor: EditorType, event: Event) => {
  console.log('ClipboardEvent 粘贴事件对象', event)

  // 自定义插入内容
  editor.insertText('xxx')

  // 返回值（注意，vue 事件的返回值，不能用 return）
  // callback(true) // 返回 true ，继续默认的粘贴行为
}
</script>

<template>
  <div>
    <Toolbar
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
      style="border-bottom: 1px solid #ccc"
    />
    <Editor
      :defaultConfig="editorConfig"
      :mode="mode"
      v-model="valueHtml"
      style="height: 400px; overflow-y: hidden"
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
