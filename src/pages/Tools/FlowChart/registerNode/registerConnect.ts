import { createApp, h, Component } from 'vue'
import Connect from './Connect.vue'
import type { LogicFlow } from '@logicflow/core'
export default function registerConnect(lf: LogicFlow) {
  lf.register('connect', ({ HtmlNode, HtmlNodeModel }) => {
    class ConnectNode extends HtmlNode {
      setHtml(rootEl: HTMLElement) {
        const { properties } = this.props.model
        const el = document.createElement('div')
        rootEl.innerHTML = ''
        rootEl.appendChild(el)

        const Profile = createApp({
          render() {
            return h(Connect as Component, {
              props: {
                name: properties.name,
              },
              on: {
                'select-button': (type: any) => {
                  console.log('select-button', type)
                },
              },
            })
          },
        })
        Profile.mount(el)
      }
    }
    class ConnectNodeModel extends HtmlNodeModel {
      initNodeData(data: any) {
        if (data.text) {
          data.text.editable = false
        }
        super.initNodeData(data)
        const width = 300
        const height = 150
        this.width = width
        this.height = height
        this.anchorsOffset = [
          [width / 2, 0],
          [0, height / 2],
          [-width / 2, 0],
          [0, -height / 2],
        ]
      }
    }
    return {
      view: ConnectNode,
      model: ConnectNodeModel,
    }
  })
}
