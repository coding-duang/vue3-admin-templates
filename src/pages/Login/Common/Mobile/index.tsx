import { FormValuesType } from '@/types'
import { formDataKey } from '@/utils'
import { NButton, NFormItem, NInput, useMessage } from 'naive-ui'
import {
  computed,
  defineComponent,
  inject,
  Ref,
  ref,
  onUnmounted,
  onMounted,
} from 'vue'
import { cacheCode } from '../../Common/Session'

import styles from './index.module.scss'

const sessionKey = 'smsTime'

export default defineComponent({
  name: 'EmailSignUp',
  setup() {
    const formData = inject(
      formDataKey,
      ({} as Ref<FormValuesType>) ||
        ref({
          mobile: '',
          verifyCode: '',
        })
    )
    const message = useMessage()
    const cache = cacheCode(sessionKey)

    const timer = ref<ReturnType<typeof setInterval>>(null)
    const loading = ref(false)

    const getEndTime = () => {
      const timeNum = Number(cache.get())
      console.log('timeNum -->', timeNum)

      if (typeof timeNum !== 'number' || timeNum === 0) return 0

      return 60 - Math.floor((new Date().getTime() - timeNum) / 1000)
    }

    const endTime = ref<number>(getEndTime() ?? 0)

    const start = () => {
      if (timer.value) {
        clearInterval(timer.value)
        timer.value = null
      }

      endTime.value = getEndTime()

      timer.value = setInterval(function () {
        endTime.value = getEndTime()
        if (endTime.value < 1) {
          clearInterval(timer.value)
          cache.clear()
          endTime.value = 0
        }
      }, 1000)
    }

    onMounted(() => {
      if (getEndTime() > 0) {
        start()
      }
    })

    const codeBtnText = computed(() =>
      endTime.value > 0
        ? `${endTime.value}s`
        : loading.value
        ? '发送中...'
        : '获取验证码'
    )

    const disabled = computed(() => loading.value || endTime.value > 0)

    const send = () => {
      if (!formData.value.mobile) {
        message.error('请输入手机号')
        return
      }

      loading.value = true
      setTimeout(() => {
        loading.value = false
        message.success('发送成功')

        const time = new Date().getTime()
        cache.set(time.toString())
        start()
      }, 3000)
    }

    onUnmounted(() => {
      timer.value && clearInterval(timer.value)
    })

    return () => (
      <>
        <NFormItem label="手机号" path="mobile" label-placement="top">
          <NInput
            v-model={[formData.value.mobile, 'value']}
            clearable
            placeholder="请输入手机号"
          />
        </NFormItem>
        <NFormItem label="验证码" path="verifyCode" labelPlacement="top">
          <NInput
            v-model={[formData.value.verifyCode, 'value']}
            clearable
            placeholder="请输入验证码"
          />
          <NButton
            tertiary
            type="info"
            class={styles.getCode}
            onClick={send}
            loading={loading.value}
            disabled={disabled.value}
          >
            {codeBtnText.value}
          </NButton>
        </NFormItem>
      </>
    )
  },
})
