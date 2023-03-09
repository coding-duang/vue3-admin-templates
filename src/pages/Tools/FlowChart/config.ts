export const nodeList = [
  {
    text: '开始',
    type: 'start',
    class: 'node-start',
  },
  {
    text: '矩形',
    type: 'rect',
    class: 'node-rect',
  },
  {
    type: 'user',
    text: '用户',
    class: 'node-user',
  },
  {
    type: 'push',
    text: '推送',
    class: 'node-push',
  },
  {
    type: 'download',
    text: '位置',
    class: 'node-download',
  },
  {
    type: 'connect',
    text: 'Html',
    class: 'node-push',
  },
  {
    type: 'end',
    text: '结束',
    class: 'node-end',
  },
]

export const BpmnNode = [
  {
    type: 'bpmn:startEvent',
    text: '开始',
    class: 'bpmn-start',
  },
  {
    type: 'bpmn:endEvent',
    text: '结束',
    class: 'bpmn-end',
  },
  {
    type: 'bpmn:exclusiveGateway',
    text: '网关',
    class: 'bpmn-exclusiveGateway',
  },
  {
    type: 'bpmn:userTask',
    text: '用户',
    class: 'bpmn-user',
  },
]

export const normalThemeMode = {
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
}

export const darkThemeMode = {
  circle: {
    stroke: '#fff',
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
    stroke: '#fff',
    hoverStroke: '#fff',
    selectedStroke: '#fff',
    outlineColor: '#88f',
    strokeWidth: 1,
  },
  nodeText: {
    color: '#fff',
  },
  edgeText: {
    color: '#000',
    background: {
      fill: '#f7f9ff',
    },
  },
}
