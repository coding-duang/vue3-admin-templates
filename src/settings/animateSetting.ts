export type AnimateType =
  | 'fade'
  | 'zoom-fade'
  | 'zoom-out'
  | 'fade-slide'
  | 'fade-bottom'
  | 'fade-scale'

export const animates: { value: AnimateType; label: string }[] = [
  { value: 'zoom-fade', label: '渐变' },
  { value: 'zoom-out', label: '闪现' },
  { value: 'fade-slide', label: '滑动' },
  { value: 'fade', label: '消退' },
  { value: 'fade-bottom', label: '底部消退' },
  { value: 'fade-scale', label: '缩放消退' },
]
