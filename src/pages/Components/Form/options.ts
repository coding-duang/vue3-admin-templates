import { FormRules, FormItemRule } from 'naive-ui'

export const radioGroup = [
  {
    value: 'male',
    label: '男',
  },
  {
    value: 'female',
    label: '女',
  },
]

export const checkboxGroup = [
  {
    value: 'Shanghai',
    label: '上海',
  },
  {
    value: 'Beijing',
    label: '北京',
  },
  {
    value: 'Guangzhou',
    label: '广州',
  },
  {
    value: 'Shenzhen',
    label: '深圳',
  },
]

export const selectOptions = ['唱歌', '舞蹈', '钢琴', '编码'].map(item => ({
  label: item,
  value: item,
}))

export const baseRules: FormRules = {
  name: {
    required: true,
    trigger: 'blur',
    validator: (rule: FormItemRule, value: string) => {
      if (!value || !value.trim()) {
        return new Error('请输入名称')
      } else if (value.length > 4) {
        return new Error('姓名超过4个字')
      }
      return true
    },
  },
  password: {
    required: true,
    message: '请输入密码',
    trigger: 'blur',
  },
  sex: {
    required: true,
    message: '请选择性别',
    trigger: 'change',
  },
  address: {
    type: 'array',
    required: true,
    message: '请选择地址',
    trigger: 'change',
  },
  hobby: {
    required: true,
    message: '请选择爱好',
    trigger: ['blur', 'select'],
  },
  goodat: {
    type: 'array',
    required: true,
    message: '请选择特长',
    trigger: ['blur', 'select'],
  },
  born: {
    type: 'number',
    required: true,
    message: '请选择出生日期',
    trigger: ['blur', 'change'],
  },
  workTime: {
    type: 'array',
    required: true,
    message: '请选择工作时间',
    trigger: ['blur', 'change'],
  },
  selfIntroduction: {
    required: true,
    message: '请输入自我介绍',
    trigger: ['blur'],
  },
  favorable: {
    type: 'number',
    required: true,
    message: '请选择好评率',
    trigger: ['blur', 'change'],
  },
}

export const migrationOptions = [
  {
    value: '结构迁移',
    label: '结构迁移',
  },
  {
    value: '全量迁移',
    label: '全量迁移',
  },
  {
    value: '增量迁移',
    label: '增量迁移',
  },
  {
    value: '全量校验',
    label: '全量校验',
  },
]

export const otherOptions = [
  {
    value: '完整LOB',
    label: '完整LOB',
  },
  {
    value: '不同步LOB',
    label: '不同步LOB',
  },
  {
    value: '受限制LOB',
    label: '受限制LOB',
  },
]

export const stepRules: FormRules = {
  name: {
    required: true,
    trigger: 'blur',
    validator: (rule: FormItemRule, value: string) => {
      if (!value || !value.trim()) {
        return new Error('请输入名称')
      } else if (value.length > 4) {
        return new Error('姓名超过4个字')
      }
      return true
    },
  },
  date: {
    type: 'number',
    required: true,
    message: '请选择日期',
    trigger: ['blur', 'change'],
  },
  timeArrange: {
    type: 'array',
    required: true,
    message: '请选择区间',
    trigger: ['blur', 'change'],
  },
  migrationType: {
    type: 'array',
    required: true,
    message: '请选择迁移类型',
    trigger: ['blur', 'select'],
  },
  business: {
    required: true,
    message: '请填写业务名',
    trigger: 'blur',
  },
  saveTime: {
    type: 'number',
    required: true,
    message: '请选择保存时间',
    trigger: ['blur', 'change'],
  },
  otherType: {
    type: 'array',
    required: true,
    message: '请选择其他类型',
    trigger: ['blur', 'change'],
  },
  deploy: {
    required: true,
    message: '请选择部署单元',
    trigger: 'blur',
  },
  strategies: {
    required: true,
    message: '请选择分组策略',
    trigger: 'blur',
  },
}

export type FormType = {
  name: string
  password: string
  sex: 'male' | 'female'
  address: string[]
  hobby: string
  goodat: string[]
  born: number
  workTime: [number, number]
  selfIntroduction: string
  favorable: number
  anonymous: boolean
}

export const deployOptions = [
  {
    value: '部署单元1',
    label: '部署单元1',
  },
  {
    value: '部署单元2',
    label: '部署单元2',
  },
  {
    value: '部署单元3',
    label: '部署单元3',
  },
]

export const strategiesOptions = [
  {
    value: '策略一',
    label: '策略一',
  },
  {
    value: '策略二',
    label: '策略二',
  },
]

export type ExperimentForm = {
  name: string
  date: number
  timeArrange: [number, number]
  remarks: string
  migrationType: (number | string)[]
  business: string
  saveTime: number
  otherType: (number | string)[]
  deploy: (number | string)[]
  strategies: string | number
}
