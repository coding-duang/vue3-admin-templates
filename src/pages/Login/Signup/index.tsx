import { FormValuesType, FormEnum } from '@/types'
import { Glasses, GlassesOutline, SwapHorizontal } from '@vicons/ionicons5'
import { values } from 'lodash'
import {
  NIcon,
  NForm,
  NFormItem,
  NInput,
  FormInst,
  FormItemRule,
  NButton,
  FormRules,
} from 'naive-ui'
import { useRouter } from 'vue-router'
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

    function validatePassword(): boolean {
      const regex = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/

      console.log(regex.test(formData.value.password), formData.value.password)

      if (!regex.test(formData.value.password)) {
        return false
      }
      return true
    }

    function validatePasswordSame(): boolean {
      console.log(formData.value.password, formData.value.reenteredPassword)
      return formData.value.password === formData.value.reenteredPassword
    }

    function validatePhone(): boolean {
      const regex =
        /^1(3\d|4[01456879]|5[0-3,5-9]|6[2567]|7[0-8]|8[0-9]|9[0-3,5-9])\d{8}$/

      if (!regex.test(formData.value.mobile)) {
        return false
      }

      return true
    }

    const rules: FormRules = {
      mobile: [
        {
          required: true,
          message: '请输入手机号码',
        },
        {
          validator: validatePhone,
          message: '请输入正确的手机号码',
          trigger: ['input', 'blur'],
        },
      ],
      password: [
        {
          required: true,
          validator: validatePassword,
          message: '请输入8-20位数字和字母组合',
          trigger: ['blur', 'input'],
        },
      ],
      reenteredPassword: [
        {
          required: true,
          validator: validatePasswordSame,
          message: '两次密码输入不一致',
          trigger: ['blur', 'input'],
        },
      ],
    }

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
