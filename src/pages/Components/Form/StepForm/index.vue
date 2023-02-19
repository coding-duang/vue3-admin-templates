<template>
  <div class="step-form-wrap">
    <n-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-placement="left"
      label-width="120px"
    >
      <div class="step-wrap">
        <n-steps :current="stepCurrent" :status="stepStatus">
          <n-step title="第一步"> </n-step>

          <n-step title="第二步"> </n-step>

          <n-step title="第三步"> </n-step>
        </n-steps>
      </div>

      <template v-if="stepCurrent === 1">
        <n-form-item label="姓名" path="name">
          <n-input v-model:value="form.name" clearable></n-input>
        </n-form-item>
        <n-form-item label="密码" path="password">
          <n-input
            :maxlength="8"
            placehold="密码"
            type="password"
            v-model:value="form.password"
          ></n-input>
        </n-form-item>

        <n-form-item label="radio" path="radio">
          <n-radio-group v-model:value="form.radio">
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

        <n-form-item label="checkbox" path="checkbox">
          <n-checkbox-group v-model:value="form.checkbox">
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

        <n-form-item>
          <n-space>
            <n-button @click="prev" v-if="stepCurrent > 1">
              <template #icon>
                <n-icon>
                  <md-arrow-round-back />
                </n-icon>
              </template>
            </n-button>

            <n-button @click="next" v-if="stepCurrent < stepCount">
              <template #icon>
                <n-icon>
                  <md-arrow-round-forward />
                </n-icon>
              </template>
            </n-button>
          </n-space>
        </n-form-item>
      </template>

      <template v-if="stepCurrent === 2">
        <n-form-item label="select" path="select">
          <n-select
            v-model:value="form.select"
            :options="selectOptions"
          ></n-select>
        </n-form-item>

        <n-form-item label="multipleSelect" path="multipleSelect">
          <n-select
            v-model:value="form.multipleSelect"
            :options="selectOptions"
            placeholder="MultipleSelect"
            multiple
          ></n-select>
        </n-form-item>

        <n-form-item>
          <n-space>
            <n-button @click="prev" v-if="stepCurrent > 1">
              <template #icon>
                <n-icon>
                  <md-arrow-round-back />
                </n-icon>
              </template>
            </n-button>

            <n-button @click="next" v-if="stepCurrent < stepCount">
              <template #icon>
                <n-icon>
                  <md-arrow-round-forward />
                </n-icon>
              </template>
            </n-button>
          </n-space>
        </n-form-item>
      </template>

      <template v-if="stepCurrent === 3">
        <n-form-item label="date" path="date">
          <n-date-picker
            v-model:value="form.date"
            type="datetime"
            clearable
            value-format="yyyy-MM-dd HH:mm:ss"
          ></n-date-picker>
        </n-form-item>

        <n-form-item label="dateRange" path="dateRange">
          <n-date-picker
            v-model:value="form.dateRange"
            type="daterange"
            clearable
            value-format="yyyy-MM-dd HH:mm:ss"
          ></n-date-picker>
        </n-form-item>

        <n-form-item label="textarea" path="textarea">
          <n-input
            type="textarea"
            placeholder="基础的textarea"
            v-model:value="form.textarea"
            clearable
          ></n-input>
        </n-form-item>

        <n-grid :cols="24" :x-gap="24">
          <n-form-item-gi :span="12" label="rate" path="rate">
            <n-rate allow-half v-model:value="form.rate" clearable />
          </n-form-item-gi>

          <n-form-item-gi :span="12" label="switch" path="switch">
            <n-switch v-model:value="form.switch"></n-switch>
          </n-form-item-gi>
        </n-grid>

        <n-form-item>
          <n-space>
            <n-button @click="prev" v-if="stepCurrent > 1">
              <template #icon>
                <n-icon>
                  <md-arrow-round-back />
                </n-icon>
              </template>
            </n-button>

            <n-button @click="next" v-if="stepCurrent < stepCount">
              <template #icon>
                <n-icon>
                  <md-arrow-round-forward />
                </n-icon>
              </template>
            </n-button>
          </n-space>
        </n-form-item>

        <n-form-item>
          <n-space>
            <n-button type="primary" @click="submit"> 创建 </n-button>
            <n-button @click="reset"> 重置 </n-button>
          </n-space>
        </n-form-item>
      </template>
    </n-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from 'vue'
import { FormItemRule, StepsProps } from 'naive-ui'
import { MdArrowRoundBack, MdArrowRoundForward } from '@vicons/ionicons4'

export default defineComponent({
  name: 'AgStepForm',
  components: {
    MdArrowRoundBack,
    MdArrowRoundForward,
  },
  setup() {
    // step 状态
    const stepCount = 3
    const stepCurrent = ref<number>(1)
    const stepStatus = computed<StepsProps['status']>(() => {
      return stepCurrent.value === stepCount ? 'finish' : 'process'
    })

    const prev = () => {
      stepCurrent.value = stepCurrent.value - 1
    }

    const next = () => {
      formRef.value?.validate((errors: unknown) => {
        if (!errors) {
          stepCurrent.value = stepCurrent.value + 1
        } else {
          console.log(errors)
          console.error('验证失败')
        }
      })
    }

    // form

    const formRef = ref(null)

    const form = reactive({
      name: '',
      password: '',
      radio: '',
      checkbox: [], // be array
      select: '',
      multipleSelect: [], // be array
      date: null,
      dateRange: null,
      textarea: '',
      rate: null,
      switch: false,
    })

    const rules = {
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

    const submit = (e: MouseEvent) => {
      console.log('submit -->>> ', form)
      e.preventDefault()
      formRef.value?.validate((errors: unknown) => {
        if (!errors) {
          console.info('验证成功')
        } else {
          console.log(errors)
          console.error('验证失败')
        }
      })
    }

    const reset = () => {
      formRef.value?.restoreValidation()
    }

    // radio group
    const radioGroup = [
      {
        value: "Rock'n'Roll Star",
        label: "Rock'n'Roll Star",
      },
      {
        value: 'Shakermaker',
        label: 'Shakermaker',
      },
      {
        value: 'Live Forever',
        label: 'Live Forever',
      },
      {
        value: 'Up in the Sky',
        label: 'Up in the Sky',
      },
    ]

    // checkbox group
    const checkboxGroup = [
      {
        value: 'Shanghai',
        label: 'Shanghai',
      },
      {
        value: 'Beijing',
        label: 'Beijing',
      },
      {
        value: 'Guangzhou',
        label: 'Guangzhou',
      },
      {
        value: 'Shenzhen',
        label: 'Shenzhen',
      },
    ]

    // select options
    const selectOptions = ['groode', 'veli good', 'emazing', 'lidiculous'].map(
      item => ({ label: item, value: item })
    )

    return {
      stepCount,
      stepCurrent,

      stepStatus,
      prev,
      next,

      formRef,
      form,
      rules,
      submit,
      reset,

      radioGroup,
      checkboxGroup,
      selectOptions,
    }
  },
})
</script>

<style lang="scss" scoped>
.step-form-wrap {
  width: 50%;
  margin: 4vh auto;
}

.step-wrap {
  margin-bottom: 40px;
}
</style>
