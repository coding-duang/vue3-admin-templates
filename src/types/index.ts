import { Component } from 'vue'

export type EleOfArr<T> = T extends Array<infer E> ? E : never

export type UnionToIntersection<U> = (
  U extends any ? (args: U) => void : never
) extends (k: infer K) => void
  ? K
  : never

export type ButtonGroupConfig = {
  key: string
  icon: Component
  name: string
}

export * from './user'
export * from './router'
export * from './table'
export * from './chat'
export * from './eCharts'
export * from './common'
export * from './wangEditor'
