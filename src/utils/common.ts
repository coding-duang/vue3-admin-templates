import { h, Component } from 'vue'
import { NIcon } from 'naive-ui'

export const renderIcon = (icon: Component) => () =>
  h(NIcon, null, { default: () => h(icon) })
