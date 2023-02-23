import { useConfig } from './config'

export type AnalysisItemType = {
  title: string
  value: number
  isRise: boolean
  compareValue: number
  chartData?: any[]
}

export type ConfigData = ReturnType<typeof useConfig>['configData']
