<template>
  <div class="logic-flow-view">
    <!-- 辅助工具栏 -->
    <Control
      class="demo-control"
      v-if="lf"
      :lf="lf"
      @catData="catData"
    ></Control>
    <!-- 节点面板 -->
    <NodePanel v-if="lf" :lf="lf" :nodeList="nodeList"></NodePanel>
    <!-- 画布 -->
    <div id="LF-view" ref="container"></div>
    <!-- 用户节点自定义操作面板 -->
    <AddPanel
      v-if="showAddPanel"
      class="add-panel"
      :style="addPanelStyle"
      :lf="lf"
      :nodeData="addClickNode"
      @addNodeFinish="hideAddPanel"
    >
    </AddPanel>
    <!-- 属性面板 -->
    <n-drawer
      v-model:show="dialogVisible"
      direction="rtl"
      default-width="502"
      :on-after-leave="closeDialog"
    >
      <n-drawer-content title="设置节点属性">
        <PropertyDialog
          v-if="dialogVisible"
          :nodeData="clickNode"
          :lf="lf"
          @setPropertiesFinish="closeDialog"
        ></PropertyDialog>
      </n-drawer-content>
    </n-drawer>
    <!-- 数据查看面板 -->
    <n-modal preset="dialog" v-model:show="dataVisible">
      <template #header> 数据 </template>
      <DataDialog :graphData="graphData"></DataDialog>
    </n-modal>
  </div>
</template>

<script lang="ts" setup>
import LogicFlow, { NodeData } from '@logicflow/core'
import { Menu, Snapshot, MiniMap } from '@logicflow/extension'
import '@logicflow/core/dist/style/index.css'
import '@logicflow/extension/lib/style/index.css'
import NodePanel from './LFComponents/NodePanel.vue'
import AddPanel from './LFComponents/AddPanel.vue'
import Control from './LFComponents/Control.vue'
import PropertyDialog from './PropertySetting/PropertyDialog.vue'
import DataDialog from './LFComponents/DataDialog.vue'
import { nodeList } from './config'
import { onMounted, ref, reactive, Ref } from 'vue'

import {
  registerStart,
  registerUser,
  registerEnd,
  registerPush,
  registerDownload,
  registerPolyline,
  registerTask,
  registerConnect,
} from './registerNode'

import demoData from './data.json'

const lf: Ref<LogicFlow> = ref()
const showAddPanel = ref(false)
const addPanelStyle = reactive({
  top: '0px',
  left: '0px',
})
const config = {
  background: {
    backgroundColor: '#f7f9ff',
  },
  grid: {
    size: 10,
    visible: false,
  },
  keyboard: {
    enabled: true,
  },
  edgeTextDraggable: true,
  hoverOutline: false,
}
const container = ref(null)
const nodeData: NodeData = null
let addClickNode: NodeData = null
const clickNode: Ref<NodeData> = ref()
const dialogVisible = ref(false)
let graphData = {}
const dataVisible = ref(false)
let moveData: Record<string, any> = {}

onMounted(() => {
  initLf()
})

const initLf = () => {
  console.log('container.value', container.value)
  // 画布配置
  lf.value = new LogicFlow({
    ...config,
    plugins: [Menu, MiniMap, Snapshot],
    container: container.value,
  })
  // 设置主题
  lf.value.setTheme({
    circle: {
      stroke: '#000000',
      strokeWidth: 1,
      outlineColor: '#88f',
    },
    rect: {
      outlineColor: '#88f',
      strokeWidth: 1,
    },
    polygon: {
      strokeWidth: 1,
    },
    polyline: {
      stroke: '#000000',
      hoverStroke: '#000000',
      selectedStroke: '#000000',
      outlineColor: '#88f',
      strokeWidth: 1,
    },
    nodeText: {
      color: '#000000',
    },
    edgeText: {
      color: '#000000',
      background: {
        fill: '#f7f9ff',
      },
    },
  })
  registerNode()
}

const registerNode = () => {
  registerStart(lf.value)
  registerUser(lf.value)
  registerEnd(lf.value)
  registerPush(lf.value, clickPlus, mouseDownPlus)
  registerDownload(lf.value)
  registerPolyline(lf.value)
  registerTask(lf.value)
  registerConnect(lf.value)
  render()
}

const render = () => {
  lf.value.render(demoData)
  LfEvent()
}

const getData = () => {
  const data = lf.value.getGraphData()
  console.log(JSON.stringify(data))
}

const LfEvent = () => {
  lf.value.on('node:click', ({ data }) => {
    console.log('node:click', data)
    clickNode.value = data
    dialogVisible.value = true
  })
  lf.value.on('edge:click', ({ data }) => {
    console.log('edge:click', data)
    clickNode.value = data
    dialogVisible.value = true
  })
  lf.value.on('element:click', () => {
    hideAddPanel()
  })
  lf.value.on('edge:add', ({ data }) => {
    console.log('edge:add', data)
  })
  lf.value.on('node:mousemove', ({ data }) => {
    console.log('node:mousemove')
    moveData = data
  })
  lf.value.on('blank:click', () => {
    hideAddPanel()
  })
  lf.value.on('connection:not-allowed', data => {
    // this.$message({
    //   type: 'error',
    //   message: data.msg,
    // })
  })
  lf.value.on('node:mousemove', () => {
    console.log('on mousemove')
  })
}

const clickPlus = (e: PointerEvent, attributes: NodeData) => {
  e.stopPropagation()
  console.log('clickPlus', e, attributes)
  const { clientX, clientY } = e
  console.log(clientX, clientY)
  addPanelStyle.top = clientY - 40 + 'px'
  addPanelStyle.left = clientX + 'px'
  showAddPanel.value = true
  addClickNode = attributes
}
const mouseDownPlus = (e: PointerEvent, attributes: NodeData) => {
  e.stopPropagation()
  console.log('mouseDownPlus', e, attributes)
}

const hideAddPanel = () => {
  showAddPanel.value = false
  addPanelStyle.top = '0px'
  addPanelStyle.left = '0px'
  addClickNode = null
}
const closeDialog = () => {
  dialogVisible.value = false
}
const catData = () => {
  graphData = lf.value.getGraphData()
  dataVisible.value = true
}
</script>

<style>
.logic-flow-view {
  height: 100%;
  position: relative;
}
.demo-title {
  text-align: center;
  margin: 20px;
}
.demo-control {
  position: absolute;
  top: 50px;
  right: 50px;
  z-index: 2;
}
#LF-view {
  /* width: calc(100% - 100px); */
  height: 100%;
  outline: none;
  /* margin-left: 50px; */
}
.time-plus {
  cursor: pointer;
}
.add-panel {
  position: absolute;
  z-index: 11;
  background-color: white;
  padding: 10px 5px;
}
.el-drawer__body {
  height: 80%;
  overflow: auto;
  margin-top: -30px;
  z-index: 3;
}

@keyframes lf_animate_dash {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
