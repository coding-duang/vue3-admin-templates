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

    <n-button v-cropper="options">点我</n-button>

    <n-modal
      v-model:show="showModal"
      preset="dialog"
      :style="{ width: 'auto' }"
      class="printModal"
      title="Dialog"
    >
      <template #header>
        <div>自定义打印内容</div>
      </template>
      <div class="editor_wrap_content">
        <Editor ref="EditorRef" :on-change="onChange" />
      </div>
      <template #action>
        <n-button type="primary" v-print="printCustom">打印</n-button>
      </template>
    </n-modal>
  </div>
</template>

<script lang="ts">
import { ref, onBeforeUnmount } from 'vue'
import print from 'vue3-print-nb'
import { usePrint } from '@/hook'
import { EditorType } from '@/pages/Components/Editor/props'
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

const options = {
  triggerCallback({ code, msg }: { code: number; msg: string }) {
    console.log(code, msg)
  },
  completeCallback(res: any) {
    console.log(res)
  },
}

onBeforeUnmount(() => {
  customHTML.value = ''
})

const onChange = (editor: EditorType) => {
  customHTML.value = editor.getHtml()
}

const printTable = usePrint({
  id: 'printTable',
})

const printImage = usePrint({
  id: 'printImage',
})

const printCustom = usePrint({
  id: 'printCustom',
})
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
  #printCustom {
    position: absolute;
    top: 10000px;
    z-index: -1;
  }
}
.editor_wrap_content {
  overflow-y: auto;
}

.printModal {
  .editor_wrap_content {
    height: 400px;
  }
}
</style>
