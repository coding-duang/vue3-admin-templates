export interface PrintProps {
  id: string
  url?: string
  asyncUrl?: string
  zIndex?: string | number
  standard?: string
  extraHead: string
  extraCss?: string
  popTitle?: string
  preview?: boolean
  previewTitle?: string
  previewPrintBtnLabel?: string
  clickMounted?: Function
  openCallback?: Function
  closeCallback?: Function
  beforeOpenCallback?: Function
  previewBeforeOpenCallback?: Function
  previewOpenCallback?: Function
}
