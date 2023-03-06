import type { LogicFlow } from '@logicflow/core'
export default function registerBase(lf: LogicFlow) {
  lf.register('base', ({ RectNode, RectNodeModel, h }) => {
    class Model extends RectNodeModel {
      getTextStyle() {
        const style = super.getTextStyle()
        style.color = '#000'
        return style
      }
    }
    return {
      view: RectNode,
      model: Model,
    }
  })
}
