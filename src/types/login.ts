export type LoginStateType = {
  sendCodeAccount: string
  isAgree: boolean
}

export enum FormEnum {
  VERIFY_CODE = 'verifyCode',
  MOBILE = 'mobile',
  PASSWORD = 'password',
  REPEAT_PASSWORD = 'reenteredPassword',
  EMAIL = 'email',
}

export type FormValuesType = {
  [FormEnum.MOBILE]: string
  [FormEnum.PASSWORD]?: string
  [FormEnum.REPEAT_PASSWORD]?: string
  [FormEnum.VERIFY_CODE]?: string
  [FormEnum.EMAIL]?: string
}

export enum NotFoundTypeEnum {
  showContactAdmin = 'showContactAdmin', // 联系管理员
  showNotFound = 'showNotFound', // 展示未找到页面
}

export enum ButtonStatus {
  'noTiming',
  'timing',
}
