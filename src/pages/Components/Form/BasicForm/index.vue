<template>
  <div class="form-wrap">
    <n-form
      ref="formRef"
      :model="modelReactive"
      :rules="baseRules"
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
          :options="selectOptions"
          placeholder="请选择个人爱好"
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
import {
  checkboxGroup,
  radioGroup,
  baseRules,
  selectOptions,
  FormType,
} from '../options'

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

const submit = (e: MouseEvent) =>
  validateForm(e, () => {
    console.log('执行我自定义的函数')
  })
</script>

<style lang="scss" scoped>
.form-wrap {
  height: calc(100vh - 160px);
  padding: 30px;
  background-color: var(--n-color);
}
</style>
