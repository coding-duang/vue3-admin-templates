/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vue3-print-nb' {
  import print from 'vue3-print-nb'
  import { Directive } from 'vue'

  const _print: Directive = print

  export default _print
}
