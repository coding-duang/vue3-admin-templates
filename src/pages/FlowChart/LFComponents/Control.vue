<template>
  <div>
    <n-button-group>
      <n-button @click="zoomIn">放大</n-button>
      <n-button @click="zoomOut">缩小</n-button>
      <n-button @click="zoomReset">大小适应</n-button>
      <n-button @click="translateRest">定位还原</n-button>
      <n-button @click="reset">还原(大小&定位)</n-button>
      <n-button @click="undo" :disabled="undoDisable">上一步(ctrl+z)</n-button>
      <n-button @click="redo" :disabled="redoDisable">下一步(ctrl+y)</n-button>
      <n-button @click="download">下载图片</n-button>
      <n-button @click="catData">查看数据</n-button>
      <n-button v-if="props.catTurboData" @click="catTurboData"
        >查看turbo数据</n-button
      >
      <n-button @click="showMiniMap">查看缩略图</n-button>
    </n-button-group>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, onMounted } from 'vue'
import type { LogicFlow } from '@logicflow/core'
const props = defineProps<{
  catTurboData?: boolean
  lf: LogicFlow
}>()

const emits = defineEmits<{
  (event: 'catData'): void
  (event: 'catTurboData'): void
}>()

const undoDisable = ref(true)
const redoDisable = ref(true)

onMounted(() => {
  props.lf.on('history:change', ({ data: { undoAble, redoAble } }) => {
    undoDisable.value = !undoAble
    redoDisable.value = !redoAble
  })
})

const zoomIn = () => {
  props.lf.zoom(true)
}
const zoomOut = () => {
  props.lf.zoom(false)
}
const zoomReset = () => {
  props.lf.resetZoom()
}
const translateRest = () => {
  props.lf.resetTranslate()
}
const reset = () => {
  props.lf.resetZoom()
  props.lf.resetTranslate()
}
const undo = () => {
  props.lf.undo()
}
const redo = () => {
  props.lf.redo()
}
const download = () => {
  props.lf.getSnapshot()
}
const catData = () => {
  emits('catData')
}
const catTurboData = () => {
  emits('catTurboData')
}
const showMiniMap = () => {
  const { lf } = props
  lf.extension.miniMap.show(lf.graphModel.width - 150, 40)
}
</script>
