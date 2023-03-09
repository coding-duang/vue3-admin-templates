import { defineComponent, provide, ref } from 'vue'
import { SwapHorizontal } from '@vicons/ionicons5'
import {
  FormInst,
  NButton,
  NForm,
  NFormItem,
  NIcon,
  NSpace,
  NTooltip,
  useMessage,
} from 'naive-ui'
import { useRouter } from 'vue-router'

import { formDataKey } from '@/utils'
import { getSignUpRules, useValidate } from '../Common/Validate'
import { FormEnum, FormValuesType } from '@/types'
import Email from './Email'
import Mobile from '../Common/Mobile'

import styles from './index.module.scss'

export default defineComponent({
  name: 'SingUp',
  setup() {
    const router = useRouter()
    const formRef = ref<FormInst | null>(null)
    const message = useMessage()
    const loading = ref(false)

    const registerType = ref<'mobile' | 'email'>('mobile')

    const formData = ref<FormValuesType>({
      [FormEnum.PASSWORD]: '',
      [FormEnum.MOBILE]: '',
      [FormEnum.REPEAT_PASSWORD]: '',
      [FormEnum.VERIFY_CODE]: '',
    })

    provide(formDataKey, formData)

    // 校验规则
    const rules = getSignUpRules(useValidate(formData))

    const switchLogin = () => {
      router.replace('/login/sign-in')
    }

    const register = () => {
      loading.value = true
      formRef.value
        ?.validate()
        .then(o => {
          setTimeout(() => {
            message.success('注册成功')
            loading.value = false
            switchLogin()
          }, 3000)
        })
        .catch(err => {
          console.log(err)
          loading.value = false
        })
    }

    return () => (
      <div class={styles.loginWrap}>
        <p class={styles.header}>
          <span onClick={switchLogin}>
            <NTooltip trigger={'hover'} placement={'top-start'}>
              {{
                default: () => <span>登陆</span>,
                trigger: () => (
                  <NIcon size="24">
                    <SwapHorizontal />
                  </NIcon>
                ),
              }}
            </NTooltip>
          </span>
        </p>
        <NForm ref={formRef} rules={rules} model={formData}>
          {registerType.value !== 'mobile' ? <Email /> : <Mobile />}

          <NSpace justify="space-between">
            <NFormItem class={styles.registerBtn} showFeedback={false}>
              <NButton loading={loading.value} onClick={register}>
                注册
              </NButton>
            </NFormItem>
            <NFormItem class={styles.registerBtn} showFeedback={false}>
              <NButton
                text
                tag="div"
                type="primary"
                onClick={() => {
                  registerType.value =
                    registerType.value === 'mobile' ? 'email' : 'mobile'

                  formData.value = {
                    [FormEnum.PASSWORD]: '',
                    [FormEnum.MOBILE]: '',
                    [FormEnum.REPEAT_PASSWORD]: '',
                    [FormEnum.VERIFY_CODE]: '',
                    [FormEnum.EMAIL]: '',
                  }
                }}
              >
                {registerType.value === 'mobile' ? '邮箱注册' : '手机号注册'}
              </NButton>
            </NFormItem>
          </NSpace>
        </NForm>
      </div>
    )
  },
})
