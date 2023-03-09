import { Glasses, GlassesOutline, SwapHorizontal } from '@vicons/ionicons5'
import {
  FormInst,
  NButton,
  NForm,
  NFormItem,
  NIcon,
  NInput,
  NSpace,
  NTooltip,
} from 'naive-ui'
import { defineComponent, ref, provide } from 'vue'
import { useRouter } from 'vue-router'
import { getSignInRules, useValidate } from '../Common/Validate'
import Mobile from '../Common/Mobile'

import { FormEnum, FormValuesType } from '@/types'

import styles from './index.module.scss'
import { formDataKey, setToken } from '@/utils'

const testDefault = {
  [FormEnum.MOBILE]: '13012341234',
  [FormEnum.PASSWORD]: 'Abc123456',
  [FormEnum.EMAIL]: 'test@qq.com',
  [FormEnum.VERIFY_CODE]: '',
}

export default defineComponent({
  name: 'LoginForm',
  setup() {
    const router = useRouter()

    const formData = ref<FormValuesType>(testDefault)

    provide(formDataKey, formData)

    const formRef = ref<FormInst | null>(null)

    const loginType = ref<'mobile' | 'email'>('email')

    const loading = ref(false)

    const rules = getSignInRules(useValidate(formData))

    const resetForm = () => {
      formData.value = {
        [FormEnum.MOBILE]: formData.value[FormEnum.MOBILE],
        [FormEnum.PASSWORD]: '',
        [FormEnum.EMAIL]: formData.value[FormEnum.EMAIL],
        [FormEnum.VERIFY_CODE]: '',
      }
    }

    const switchRegister = () => {
      router.replace('/login/sign-up')
    }

    const login = () => {
      formRef.value
        ?.validate()
        .then(() => {
          loading.value = true
          setTimeout(() => {
            setToken('mockToken')
            loading.value = false
            router.push('/')
          }, 1000)
        })
        .catch(err => {
          console.error('err', err)
        })
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
        <NForm ref={formRef} model={formData} rules={rules}>
          {loginType.value === 'mobile' ? (
            <Mobile />
          ) : (
            <>
              <NFormItem label="邮箱" label-placement="top" path="email">
                <NInput
                  v-model={[formData.value.email, 'value']}
                  clearable
                  placeholder="请输入邮箱"
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
            </>
          )}
          <NSpace justify="space-between">
            <NFormItem class={styles.loginBtn}>
              <NButton loading={loading.value} onClick={login}>
                登录
              </NButton>
            </NFormItem>
            <NFormItem class={styles.registerBtn} showFeedback={false}>
              <NButton
                text
                tag="div"
                type="primary"
                onClick={() => {
                  loginType.value =
                    loginType.value === 'mobile' ? 'email' : 'mobile'
                  resetForm()
                }}
              >
                {loginType.value === 'mobile' ? '邮箱登录' : '手机号登录'}
              </NButton>
            </NFormItem>
          </NSpace>
        </NForm>
      </div>
    )
  },
})
