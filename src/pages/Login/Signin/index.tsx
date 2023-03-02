import { onMounted, reactive, ref } from 'vue'
import { FormEnum, FormValuesType } from '@/types'
import { FormInst, NButton, NForm, NFormItem, NIcon, NInput } from 'naive-ui'

import { Glasses, GlassesOutline, SwapHorizontal } from '@vicons/ionicons5'
import { useRouter } from 'vue-router'
import styles from './index.module.scss'

export default defineComponent({
  name: 'LoginForm',
  setup() {
    const router = useRouter()

    const values = reactive<FormValuesType>({
      [FormEnum.PASSWORD]: '',
      [FormEnum.MOBILE]: '',
    })

    const fromRef = ref<FormInst | null>(null)

    const phoneCheck = () => {
      const regex =
        /^1(3\d|4[01456879]|5[0-3,5-9]|6[2567]|7[0-8]|8[0-9]|9[0-3,5-9])\d{8}$/
      if (!regex.test(values.mobile)) {
        return false
      }
      return true
    }
    const passwordCheck = () => {
      // 8-20位数字和字母组合
      const regex = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/

      if (!regex.test(values.password)) {
        return false
      }
      return true
    }

    // validation
    const phoneValidationStatus = computed(() => {
      if (!values.mobile) {
        return 'error'
      }

      if (!phoneCheck()) {
        return 'error'
      }

      return undefined
    })

    const phoneFeedback = computed(() => {
      if (!values.mobile) {
        return '请输入手机号码'
      }

      if (!phoneCheck()) {
        return '请输入正确的手机号码'
      }

      return ''
    })

    const passwordValidationStatus = computed(() => {
      if (!values.password) {
        return 'error'
      }

      if (!passwordCheck()) {
        return 'error'
      }
      return undefined
    })

    const passwordFeedback = computed(() => {
      if (!values.password) {
        return '请输入密码'
      }
      if (!passwordCheck()) {
        return '请输入正确的密码'
      }
    })

    onMounted(() => {
      //TODO:  Auto login
    })

    return () => (
      <div class={styles.loginWrap}>
        <p class={styles.header}>
          <span>登陆</span>
          <NIcon
            size="24"
            onClick={() => {
              router.replace('/login/sign-up')
            }}
          >
            <SwapHorizontal />
          </NIcon>
        </p>
        <NForm ref={fromRef}>
          <NFormItem
            label="账号"
            label-placement="top"
            class={styles.item}
            validation-status={phoneValidationStatus.value}
            feedback={phoneFeedback.value}
          >
            <NInput
              v-model={[values.mobile, 'model-value']}
              clearable
              placeholder="请输入11位手机号码"
            />
          </NFormItem>

          <NFormItem
            label="密码"
            label-placement="top"
            validation-status={passwordValidationStatus.value}
            feedback={passwordFeedback.value}
          >
            <NInput
              type="password"
              show-password-on="click"
              v-model={[values.password, 'model-value']}
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
