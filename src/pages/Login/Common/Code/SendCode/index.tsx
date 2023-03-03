import { computed, inject, Ref, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { NForm, NButton, useMessage } from 'naive-ui'

import { FormEnum, ButtonStatus } from '@/types'
import useSendCode from '../Hooks/useSendCode'

import { useLoginStore } from '@/store'

export default defineComponent({
  name: 'SendCode',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const message = useMessage()
    const loginState = useLoginStore()

    const getCode = async (mobile: string) => {
      // TODO: 获取验证码
    }

    const fromRef = inject('formRef') as Ref<typeof NForm>

    const disabled = computed(
      () => phoneValidLoading.value || ButtonStatus.timing === status.value
    )

    const { status, phoneValidLoading, sendSmsCode, buttonText } = toRefs(
      useSendCode({
        jumpCallback: async () => {
          const redirect = (route.query.redirect as string) || '/'
          const query: Record<string, string> = {
            [FormEnum.MOBILE]: fromRef.value.getValues()?.[
              FormEnum.MOBILE
            ] as string,
          }

          if (redirect) {
            query.redirect = redirect
          }

          await router.replace({
            path: '/login/code',
            query,
          })
        },
        form: fromRef,
        getCode,
      })
    )

    return () => (
      <NButton
        onClick={async () => {
          if (!loginState.$state.isAgree) {
            message.warning('请先同意用户服务协议和用户隐私政策')
            return
          }
          // TODO: 添加额外判断
          sendSmsCode.value()
        }}
      >
        {buttonText.value}
      </NButton>
    )
  },
})
