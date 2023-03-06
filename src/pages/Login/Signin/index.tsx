import { Glasses, GlassesOutline, SwapHorizontal } from '@vicons/ionicons5'
import {
  FormInst,
  NButton,
  NForm,
  NFormItem,
  NIcon,
  NInput,
  NTooltip,
} from 'naive-ui'
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getSignInRules, useValidate } from '../Common/Validate'

import { FormEnum, FormValuesType } from '@/types'

import styles from './index.module.scss'

export default defineComponent({
  name: 'LoginForm',
  setup() {
    const router = useRouter()

    const formData = ref<FormValuesType>({
      [FormEnum.MOBILE]: '13012341234',
      [FormEnum.PASSWORD]: 'Abc123456',
    })

    const fromRef = ref<FormInst | null>(null)
    const loading = ref(false)

    const { validatePhone, validatePassword } = useValidate(formData)

    const rules = getSignInRules({
      validatePhone,
      validatePassword,
    })

    const switchRegister = () => {
      router.replace('/login/sign-up')
    }

    const login = () => {
      // TEST: 13012341234  Abc123456
      formData.value.mobile = '13012341234'
      formData.value.password = 'Abc123456'

      if (!formData.value.mobile) {
        message.warning('请输入手机号码')
        return
      }

      if (!formData.value.password) {
        message.warning('请输入密码')
        return
      }

      loading.value = true
      setTimeout(() => {
        loading.value = false
        router.push('/')
      }, 1000)
    }

    return () => (
      <div class={styles.loginWrap}>
        <p class={styles.header}>
          <span onClick={switchRegister}>
            <NTooltip trigger={'hover'} placement={'top-start'}>
              {{
                default: () => <span>注册</span>,
                trigger: () => (
                  <NIcon size="24">
                    <SwapHorizontal />
                  </NIcon>
                ),
              }}
            </NTooltip>
          </span>
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
          <NFormItem class={styles.loginBtn}>
            <NButton loading={loading.value} onClick={login}>
              登录
            </NButton>
          </NFormItem>
        </NForm>
      </div>
    )
  },
})
