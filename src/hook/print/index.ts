import { PrintProps } from '@/types'

/**
 * @params {
 *  popTitle: 打印配置页上方的标题
 *  extraHead: 最上方的头部文字，附加在head标签上的额外标签，使用逗号分割
 *  priview: 是否启动预览模式
 *  previewTitle: 打印预览的标题
 *  previewPrintBtnLabel: 打印预览的标题下方的按钮文本，点击可进入打印
 *  zIndex: 预览窗口的z-index
 *  previewBeforeOpenCallback: 正在加载预览窗口钩子
 *  previewOpenCallback: 已经加载完预览窗口，预览打开了
 *  beforeOpenCallback: 开始打印前
 *  openCallback: 执行打印了
 *  closeCallback: 已经关闭打印
 *  clickMounted: 点击v-print绑定的按钮触发的钩子
 * } props
 *
 */
export const usePrint = (props: Partial<PrintProps> = {}): PrintProps => {
  const {
    id = 'printId',
    popTitle = '',
    extraHead = '',
    preview = false,
    previewTitle = '',
    previewPrintBtnLabel = '点击打印',
    zIndex = 20003,
    previewBeforeOpenCallback = () => {
      console.log('正在加载预览窗口！')
    },
    previewOpenCallback = () => {
      console.log('已经加载完预览窗口，预览打开了！')
    }, // 预览窗口打开时的callback
    beforeOpenCallback = () => {
      console.log('开始打印之前！')
    }, // 开始打印之前的callback
    openCallback = () => {
      console.log('执行打印了！')
    }, // 调用打印时的callback
    closeCallback = () => {
      console.log('关闭了打印工具！')
    }, // 关闭打印的callback(无法区分确认or取消)
    clickMounted = () => {
      console.log('点击v-print绑定的按钮了！')
    },
  } = props

  return {
    id,
    popTitle,
    extraHead,
    preview,
    previewTitle,
    previewPrintBtnLabel,
    zIndex,
    previewBeforeOpenCallback,
    previewOpenCallback, // 预览窗口打开时的callback
    beforeOpenCallback, // 开始打印之前的callback
    openCallback, // 调用打印时的callback
    closeCallback, // 关闭打印的callback(无法区分确认or取消)
    clickMounted,
  }
}
