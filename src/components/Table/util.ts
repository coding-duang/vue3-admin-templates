import { Ref } from 'vue'

const HEADER_HEIGHT = 60
const PADDING = 20 * 2
const PADDING_IN = 15 * 2

export const computeHeight = (conditionRef: HTMLDivElement | null) => {
  const screenHeight = document.body.clientHeight
  const conditionHeight = conditionRef ? conditionRef.clientHeight : 0

  return (
    screenHeight - HEADER_HEIGHT - PADDING - conditionHeight - PADDING_IN - 100
  )
}
