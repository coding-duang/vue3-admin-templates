import { SlateDescendant, SlateElement, SlateText } from '@wangeditor/editor'

declare module '@wangeditor/editor' {
  // 扩展 Text
  interface SlateText {
    text: string
  }

  // 扩展 Element
  interface SlateElement {
    type: string
    children: SlateDescendant[]
  }
}

export type RegisterType = 'module' | 'plugin'
export interface RegisterFn {
  type: RegisterType
  key: string
  Factory: any
}
export type currentValue =
  | { type: 'md' | 'html'; content: string | null }
  | {
      type: 'png'
      content: HTMLCanvasElement | null
    }
