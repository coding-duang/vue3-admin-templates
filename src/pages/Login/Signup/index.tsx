import { FormEnum, FormValuesType } from '@/types'
import { Glasses, GlassesOutline, SwapHorizontal } from '@vicons/ionicons5'
import { FormInst, NButton, NForm, NFormItem, NIcon, NInput } from 'naive-ui'
import { useRouter } from 'vue-router'
import { getSignUpRules, useValidate } from '../Common/Validate'
import styles from './index.module.scss'

export default defineComponent({
  name: 'SingUp',
  setup() {
    const router = useRouter()
    const fromRef = ref<FormInst | null>(null)

    const formData = ref<FormValuesType>({
      [FormEnum.PASSWORD]: '',
      [FormEnum.MOBILE]: '',
      [FormEnum.REPEAT_PASSWORD]: '',
    })

    const { validatePhone, validatePassword, validatePasswordSame } =
      useValidate(formData)

    const rules = getSignUpRules({
      validatePhone,
      validatePassword,
      validatePasswordSame,
    })

    return () => (
      <div class={styles.loginWrap}>
        <p class={styles.header}>
          <span>注册</span>
          <NIcon
            size="24"
            onClick={() => {
              router.replace('/login/sign-in')
            }}
          >
            <SwapHorizontal />
          </NIcon>
        </p>
        <NForm ref={fromRef} rules={rules} model={formData}>
          <NFormItem
            label="账号"
            path="mobile"
            label-placement="top"
            class={styles.item}
          >
            <NInput
              v-model={[formData.value.mobile, 'value']}
              clearable
              placeholder="请输入11位手机号码"
            />
          </NFormItem>
          <NFormItem label="密码" path="password" label-placement="top">
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
          <NFormItem
            label="再次输入密码"
            path="reenteredPassword"
            first
            label-placement="top"
          >
            <NInput
              type="password"
              show-password-on="click"
              v-model={[formData.value.reenteredPassword, 'value']}
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
