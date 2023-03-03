import { FormValuesType } from '@/types'
import { FormRules } from 'naive-ui'
import { Ref } from 'vue'

export const useValidate = (formData: Ref<FormValuesType>) => {
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

  function validateEmail(): boolean {
    const regex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

    if (!regex.test(formData.value.mobile)) {
      return false
    }

    return true
  }

  function validatorVerifyCode() {
    const regex = /^\d{6}$/

    if (!regex.test(formData.value.verifyCode)) {
      return false
    }

    return true
  }

  return {
    validatePassword,
    validatePasswordSame,
    validatePhone,
    validatorVerifyCode,
    validateEmail,
  }
}

export const getSignUpRules = ({
  validatePassword,
  validatePasswordSame,
  validatePhone,
  validatorVerifyCode,
  validateEmail,
}: {
  validatePassword: (...args: any) => boolean
  validatePasswordSame: (...args: any) => boolean
  validatePhone: (...args: any) => boolean
  validatorVerifyCode: (...args: any) => boolean
  validateEmail: (...args: any) => boolean
}) =>
  ({
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
    verifyCode: [
      {
        required: true,
        validator: validatorVerifyCode,
        message: '请输入6位验证码',
        trigger: ['blur', 'input'],
      },
    ],
    email: [
      {
        required: true,
        validator: validateEmail,
        message: '请输入邮箱',
        trigger: ['blur', 'input'],
      },
    ],
  } as FormRules)

export const getSignInRules = ({
  validatePassword,
  validatePhone,
}: {
  validatePassword: (...args: any) => boolean
  validatePhone: (...args: any) => boolean
}) =>
  ({
    mobile: [
      {
        required: true,
        message: '请输入账号',
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
  } as FormRules)
