import { Glasses, GlassesOutline, SwapHorizontal } from '@vicons/ionicons5'
import { FormInst, NButton, NForm, NFormItem, NIcon, NInput } from 'naive-ui'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getSignInRules, useValidate } from '../Common/Validate'

import { FormEnum, FormValuesType } from '@/types'

import styles from './index.module.scss'

export default defineComponent({
  name: 'LoginForm',
  setup() {
    const router = useRouter()

    const formData = ref<FormValuesType>({
      [FormEnum.PASSWORD]: '',
      [FormEnum.MOBILE]: '',
    })

    const fromRef = ref<FormInst | null>(null)

    const { validatePhone, validatePassword } = useValidate(formData)

    const rules = getSignInRules({
      validatePhone,
      validatePassword,
    })

    onMounted(() => {
      //TODO:  Auto login
    })

    return () => (
      <div class={styles.loginWrap}>
        <p class={styles.header}>
          <NIcon
            size="24"
            onClick={() => {
              router.replace('/login/sign-up')
            }}
          >
            <SwapHorizontal />
          </NIcon>
        </p>
        <NForm ref={fromRef} model={formData} rules={rules}>
          <NFormItem label="账号" label-placement="top" path="mobile">
            <NInput
              v-model={[formData.value.mobile, 'value']}
              clearable
              placeholder="请输入11位手机号码"
            />
          </NFormItem>

          <NFormItem label="密码" label-placement="top" path="password">
            <NInput
              type="password"
              show-password-on="click"
              v-model={[formData.value.password, 'value']}
            >
              {{
                passwordVisibleIcon: () => (
                  <NIcon size={16} component={GlassesOutline} />
                ),
                passwordInvisibleIcon: () => (
                  <NIcon size={16} component={Glasses} />
                ),
              }}
            </NInput>
          </NFormItem>
          <NFormItem class={styles.submit}>
            <NButton>登录</NButton>
          </NFormItem>
        </NForm>
      </div>
    )
  },
})
