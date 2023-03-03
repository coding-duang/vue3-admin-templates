import { defineComponent, provide, ref } from 'vue'
import { SwapHorizontal } from '@vicons/ionicons5'
import { FormInst, NButton, NForm, NFormItem, NIcon, NSpace } from 'naive-ui'
import { useRouter } from 'vue-router'

import { formDataKey } from '@/utils'
import { getSignUpRules, useValidate } from '../Common/Validate'
import { FormEnum, FormValuesType } from '@/types'
import Email from './Email'
import Mobile from './Mobile'

import styles from './index.module.scss'

export default defineComponent({
  name: 'SingUp',
  setup() {
    const router = useRouter()
    const fromRef = ref<FormInst | null>(null)

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

    return () => (
      <div class={styles.loginWrap}>
        <p class={styles.header}>
          <span onClick={switchLogin}>
            <NIcon size="24">
              <SwapHorizontal />
            </NIcon>
          </span>
        </p>
        <NForm ref={fromRef} rules={rules} model={formData}>
          {registerType.value !== 'mobile' ? <Email /> : <Mobile />}

          <NSpace justify="space-between">
            <NFormItem class={styles.registerBtn} showFeedback={false}>
              <NButton>注册</NButton>
            </NFormItem>
            <NFormItem class={styles.registerBtn} showFeedback={false}>
              <NButton
                text
                tag="div"
                type="primary"
                onClick={() => {
                  registerType.value =
                    registerType.value === 'mobile' ? 'email' : 'mobile'
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
