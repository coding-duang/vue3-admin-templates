<template>
  <div class="printWrapper">
    <div class="btnGroup">
      <n-button class="buttonItem" type="primary" v-print="printTable"
        >打印表格</n-button
      >
      <n-button class="buttonItem" type="primary" v-print="printImage"
        >打印图片</n-button
      >
      <n-button class="buttonItem" type="primary" @click="showModal = true"
        >自定义打印</n-button
      >
    </div>
    <div id="printTable">
      <PrintTable />
    </div>

    <div id="printImage">
      <n-image
        width="420"
        height="300"
        src="https://cdn.pixabay.com/photo/2022/08/31/13/05/sea-7423274__480.jpg"
      ></n-image>
    </div>

    <div id="printCustom">
      <div v-html="customHTML"></div>
    </div>

    <n-modal
      v-model:show="showModal"
      preset="dialog"
      :style="{ width: 'auto' }"
      title="Dialog"
    >
      <template #header>
        <div>自定义打印内容</div>
      </template>
      <Editor ref="EditorRef" />
      <template #action>
        <n-button type="primary" v-print="printCustom">打印</n-button>
      </template>
    </n-modal>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import print from 'vue3-print-nb'
import { usePrint } from '@/hook'
import Editor from '@/pages/Components/Editor/index.vue'
import { PrintTable } from './components/table'

export default {
  directives: {
    print,
  },
}
</script>
<script lang="ts" setup>
const EditorRef = ref<typeof Editor | null>(null)
const showModal = ref(false)
const customHTML = ref('')

const printTable = usePrint({
  id: 'printTable',
})

const printImage = usePrint({
  id: 'printImage',
})

const printCustom = usePrint({
  id: 'printCustom',
  openCallback: () => {
    customHTML.value = EditorRef.value?.editorRef.getHtml()
  },
})

const callbacks = {}
</script>

<style lang="scss" scoped>
.printWrapper {
  padding: 30px;
  .btnGroup {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .buttonItem {
      margin-right: 10px;
    }
  }
  #printTable {
    width: 58%;
  }
  #printImage {
    margin-top: 20px;
  }
}
</style>
