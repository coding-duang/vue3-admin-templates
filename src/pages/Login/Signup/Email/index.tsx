import { defineComponent, inject, Ref, ref } from 'vue'
import { NFormItem, NInput } from 'naive-ui'
import { formDataKey } from '@/utils'
import { FormValuesType } from '@/types'

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
        <NFormItem label="邮箱" path="emil" labelPlacement="top">
          <NInput
            v-model={[formData.value.email, 'value']}
            clearable
            placeholder="请输入邮箱"
          />
        </NFormItem>
        <NFormItem label="验证码" path="verifyCode" labelPlacement="top">
          <NInput
            v-model={[formData.value.verifyCode, 'value']}
            clearable
            placeholder="请输入验证码"
          />
        </NFormItem>
      </>
    )
  },
})
