<template>
  <n-tabs tab-position="left">
    <n-tab-pane name="添加动作">
      <div v-for="item in nodeList" :key="item.type">
        <n-button class="add-node-btn" @click="addNode(item)">{{
          item.label
        }}</n-button>
      </div>
    </n-tab-pane>
    <n-tab-pane name="添加组">
      <n-button class="add-node-btn" @click="addTempalte">模板</n-button>
    </n-tab-pane>
  </n-tabs>
</template>

<script lang="ts" setup>
import type { LogicFlow, NodeData } from '@logicflow/core'
const nodeList = [
  {
    type: 'user',
    label: '用户',
  },
  {
    type: 'push',
    label: '推送',
  },
]

const props = defineProps<{
  nodeData: NodeData
  lf: LogicFlow
}>()

const emits = defineEmits<{
  (event: 'addNodeFinish'): void
}>()

const addNode = (item: { type: string; label: string }) => {
  const { lf, nodeData } = props
  const { id, x, y } = nodeData
  const nextNode = lf.addNode({
    type: item.type,
    x: x + 150,
    y: y + 150,
  })
  const nextId = nextNode.id
  lf.addEdge({ sourceNodeId: id, targetNodeId: nextId })
  emits('addNodeFinish')
}

const addTempalte = () => {
  const { lf, nodeData } = props
  const { id, x, y } = nodeData
  const timeNode = lf.addNode({
    type: 'download',
    x,
    y: y + 150,
  })
  const userNode = lf.addNode({
    type: 'user',
    x: x + 150,
    y: y + 150,
  })
  const pushNode = lf.addNode({
    type: 'push',
    x: x + 150,
    y: y + 300,
    properties: {},
  })
  const endNode = lf.addNode({
    type: 'end',
    x: x + 300,
    y: y + 150,
  })
  const endNode2 = lf.addNode({
    type: 'end',
    x: x + 300,
    y: y + 300,
  })
  lf.addEdge({ sourceNodeId: id, targetNodeId: timeNode.id })
  lf.addEdge({ sourceNodeId: timeNode.id, targetNodeId: userNode.id })
  lf.addEdge({
    sourceNodeId: userNode.id,
    targetNodeId: endNode.id,
    endPoint: { x: x + 280, y: y + 150 },
    text: {
      value: 'Y',
      x: x + 230,
      y: y + 140,
    },
  })
  lf.addEdge({
    sourceNodeId: userNode.id,
    targetNodeId: pushNode.id,
    text: {
      value: 'N',
      x: x + 160,
      y: y + 230,
    },
  })
  lf.addEdge({
    sourceNodeId: pushNode.id,
    targetNodeId: endNode2.id,
    endPoint: { x: x + 280, y: y + 300 },
  })
  emits('addNodeFinish')
}
</script>
