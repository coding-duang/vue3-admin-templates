import type { LogicFlow } from '@logicflow/core'
export default function registerPolyline(lf: LogicFlow) {
  lf.register('polyline', ({ PolylineEdge, PolylineEdgeModel }) => {
    class ConnnectionModel extends PolylineEdgeModel {
      constructor(data: any, graphModel: any) {
        super(data, graphModel)
      }

      setHovered(isHovered: boolean) {
        super.setHovered(isHovered)
        this.isAnimation = isHovered
      }

      getEdgeAnimationStyle() {
        const style = super.getEdgeAnimationStyle()
        style.animationName = 'lf_animate_dash'
        return style
      }
    }
    return {
      view: PolylineEdge,
      model: ConnnectionModel,
    }
  })
}
