import { defineComponent, inject, Ref, ref } from 'vue'
import { NFormItem, NIcon, NInput } from 'naive-ui'
import { formDataKey } from '@/utils'
import { FormValuesType } from '@/types'
import { LockRound, LockOpenFilled } from '@vicons/material'

export default defineComponent({
  name: 'MobileSingUp',
  setup() {
    const formData =
      inject(formDataKey, {} as Ref<FormValuesType>) ||
      ref({
        password: '',
        reenteredPassword: '',
        mobile: '',
        verifyCode: '',
        email: '',
      })

    return () => (
      <>
        <NFormItem label="邮箱" path="email" labelPlacement="top">
          <NInput
            v-model={[formData.value.email, 'value']}
            clearable
            placeholder="请输入邮箱"
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
                <NIcon size={16} component={LockOpenFilled} />
              ),
              passwordInvisibleIcon: () => (
                <NIcon size={16} component={LockRound} />
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
                <NIcon size={16} component={LockOpenFilled} />
              ),
              passwordInvisibleIcon: () => (
                <NIcon size={16} component={LockRound} />
              ),
            }}
          </NInput>
        </NFormItem>
      </>
    )
  },
})
