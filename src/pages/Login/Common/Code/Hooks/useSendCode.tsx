import { useLoginStore } from '@/store'

import { ButtonStatus, FormValuesType } from '@/types'
import { NForm, useMessage } from 'naive-ui'
import { sessionSync } from '../../Session'

import { computed, onMounted, Ref, ref, reactive, onUnmounted } from 'vue'

const useSendCode = ({
  jumpCallback,
  form,
  getCode,
}: {
  jumpCallback: () => void
  form: Ref<typeof NForm>
  getCode: (mobile: string) => Promise<void>
}) => {
  const status = ref<ButtonStatus>()
  const message = useMessage()
  const session = sessionSync()

  const loginState = useLoginStore()

  const time = ref(60)
  const timer = ref<number | null>(null)

  const phoneValidLoading = ref(false)

  const buttonText = computed(() => {
    return status.value !== ButtonStatus.timing
      ? phoneValidLoading.value
        ? '发送中...'
        : '获取验证码'
      : `重新获取 ${time.value}s`
  })

  const sendCodeOnCompleted = async () => {
    start({ reset: true })
    message.success('验证码发送成功')

    jumpCallback && jumpCallback()
  }

  const sendSmsCode = async () => {
    try {
      await form?.value?.validate(['mobile'])
      const { mobile } = form?.value?.getValues() as FormValuesType

      loginState.$patch({
        sendCodeAccount: mobile,
      })

      if (mobile) {
        phoneValidLoading.value = true
        await getCode(mobile)
        phoneValidLoading.value = false

        session.set({ phone: mobile })

        await sendCodeOnCompleted()
      } else {
        message.error('请填写手机号')
      }
    } catch (error) {
      status.value = ButtonStatus.noTiming
      phoneValidLoading.value = false
    }
  }

  const clearAndStop = () => {
    if (timer.value) {
      window.clearInterval(timer.value)
    }

    // clearSession()

    time.value = 60
    status.value = ButtonStatus.noTiming
  }

  const startCountdown = (sessionTime?: number) => {
    status.value = ButtonStatus.timing
    let showTime = sessionTime || 60
    time.value = showTime

    const endTime = new Date().getTime() + showTime * 1000
    session.set({ time: endTime + '' })

    // 执行倒计时
    timer.value = window.setInterval(() => {
      showTime = showTime - 1
      time.value = showTime
      if (showTime < 0) {
        clearAndStop()
      }
    }, 1000)
  }

  const start = ({ reset }: { reset?: boolean }) => {
    let sessionTime = -1
    const { time } = session.get()

    // 注解： ~~ 是 取整 、  + 是 toNumber
    if (time) {
      sessionTime = ~~((+time - new Date().getTime()) / 1000)
    }

    if (sessionTime > 0) {
      startCountdown(sessionTime)
    } else {
      status.value = ButtonStatus.noTiming
      // clearSession()
    }
    if (reset) {
      startCountdown(60)
    }
  }

  onMounted(() => {
    start({ reset: false })
  })

  onUnmounted(() => {
    if (timer.value) clearInterval(timer.value)
  })

  return reactive({
    status,
    time,
    start,
    buttonText,
    sendSmsCode,
    phoneValidLoading,
  })
}
export default useSendCode
