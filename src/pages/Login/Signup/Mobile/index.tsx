import { FormValuesType } from '@/types'
import { formDataKey } from '@/utils'
import { NFormItem, NIcon, NInput } from 'naive-ui'
import { defineComponent, inject, Ref, ref } from 'vue'
import { Glasses, GlassesOutline } from '@vicons/ionicons5'

export default defineComponent({
  name: 'EmailSignUp',
  setup() {
    const formData = inject(
      formDataKey,
      ({} as Ref<FormValuesType>) ||
        ref({
          mobile: '',
          verifyCode: '',
          password: '',
          reenteredPassword: '',
          email: '',
        })
    )

    return () => (
      <>
        <NFormItem label="手机号" path="mobile" label-placement="top">
          <NInput
            v-model={[formData.value.mobile, 'value']}
            clearable
            placeholder="请输入手机号"
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
      </>
    )
  },
})
