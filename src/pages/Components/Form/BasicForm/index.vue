<template>
  <div class="form-wrap">
    <n-form
      ref="formRef"
      :model="modelReactive"
      :rules="rules"
      label-placement="left"
      label-width="auto"
    >
      <n-form-item label="姓名:" path="name">
        <n-input v-model:value="modelReactive.name" clearable></n-input>
      </n-form-item>
      <n-form-item label="密码:" path="password">
        <n-input
          :maxlength="8"
          placehold="密码"
          type="password"
          v-model:value="modelReactive.password"
        ></n-input>
      </n-form-item>

      <n-form-item label="性别:" path="sex">
        <n-radio-group v-model:value="modelReactive.sex">
          <n-space>
            <n-radio
              v-for="radioItem in radioGroup"
              :key="radioItem.value"
              :value="radioItem.value"
            >
              {{ radioItem.label }}
            </n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>

      <n-form-item label="户籍地址:" path="address">
        <n-checkbox-group v-model:value="modelReactive.address">
          <n-space>
            <n-checkbox
              v-for="checkboxItem in checkboxGroup"
              :key="checkboxItem.value"
              :value="checkboxItem.value"
            >
              {{ checkboxItem.label }}
            </n-checkbox>
          </n-space>
        </n-checkbox-group>
      </n-form-item>

      <n-form-item label="个人爱好:" path="hobby">
        <n-select
          v-model:value="modelReactive.hobby"
          placeholder="请选择个人爱好"
          :options="selectOptions"
        ></n-select>
      </n-form-item>

      <n-form-item label="拿手特长:" path="goodat">
        <n-select
          v-model:value="modelReactive.goodat"
          :options="selectOptions"
          placeholder="请选择拿手特长"
          multiple
        ></n-select>
      </n-form-item>

      <n-form-item label="出生日期" path="born">
        <n-date-picker
          v-model:value="modelReactive.born"
          type="datetime"
          clearable
          value-format="yyyy-MM-dd HH:mm:ss"
        ></n-date-picker>
      </n-form-item>

      <n-form-item label="工作时间:" path="workTime">
        <n-date-picker
          v-model:value="modelReactive.workTime"
          type="daterange"
          clearable
          value-format="yyyy-MM-dd HH:mm:ss"
        ></n-date-picker>
      </n-form-item>

      <n-form-item label="自我介绍:" path="selfIntroduction">
        <n-input
          type="textarea"
          placeholder="自我介绍"
          v-model:value="modelReactive.selfIntroduction"
          clearable
        ></n-input>
      </n-form-item>

      <n-grid :cols="24" :x-gap="24">
        <n-form-item-gi :span="12" label="好评率:" path="favorable">
          <n-rate
            allow-half
            v-model:value="modelReactive.favorable"
            clearable
          />
        </n-form-item-gi>

        <n-form-item-gi :span="12" label="是否匿名:" path="anonymous">
          <n-switch v-model:value="modelReactive.anonymous"></n-switch>
        </n-form-item-gi>
      </n-grid>

      <n-form-item>
        <n-space>
          <n-button type="primary" @click="submit"> 创建 </n-button>
          <n-button @click="reset"> 重置 </n-button>
        </n-space>
      </n-form-item>
    </n-form>
  </div>
</template>

<script lang="ts" setup>
import { useForm } from '@/hook'
import { FormItemRule, FormRules } from 'naive-ui'

type FormType = {
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

const initValues: FormType = {
  name: '',
  password: '',
  sex: 'male',
  address: [],
  hobby: '',
  goodat: [],
  born: null,
  workTime: null,
  selfIntroduction: '',
  favorable: null,
  anonymous: false,
}
const { formRef, modelReactive, resetModelReactive, validateForm } =
  useForm(initValues)

const reset = (e: MouseEvent) => resetModelReactive()
const rules: FormRules = {
  // 自定义校验
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
  radio: {
    required: true,
    message: '请选择radio',
    trigger: 'change',
  },
  checkbox: {
    type: 'array', // ！注意 type
    required: true,
    message: '请选择checkbox',
    trigger: 'change',
  },
  select: {
    required: true,
    message: '请选择 select',
    trigger: ['blur', 'select'],
  },
  multipleSelect: {
    type: 'array',
    required: true,
    message: '请选择 multiple select',
    trigger: ['blur', 'select'],
  },
  date: {
    type: 'number',
    required: true,
    message: '请输入date',
    trigger: ['blur', 'change'],
  },
  dateRange: {
    type: 'array',
    required: true,
    message: '请输入 date range',
    trigger: ['blur', 'change'],
  },
  textarea: {
    required: true,
    message: '请输入textarea',
    trigger: ['blur'],
  },
  rate: {
    type: 'number',
    required: true,
    message: '请输入rate',
    trigger: ['blur', 'change'],
  },
}

const radioGroup = [
  {
    value: 'male',
    label: '男',
  },
  {
    value: 'female',
    label: '女',
  },
]

// checkbox group
const checkboxGroup = [
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

const submit = (e: MouseEvent) =>
  validateForm(e, () => {
    console.log('执行我自定义的函数')
  })

const selectOptions = ['唱歌', '舞蹈', '钢琴', '编码'].map(item => ({
  label: item,
  value: item,
}))
</script>

<style lang="scss" scoped>
.form-wrap {
  width: 50%;
  margin: 4vh auto;
}
</style>
