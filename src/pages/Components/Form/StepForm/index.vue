<template>
  <div class="step-form-wrap">
    <n-form
      ref="formRef"
      :model="modelReactive"
      :rules="stepRules"
      label-placement="left"
      label-width="120px"
    >
      <div class="step-wrap">
        <n-steps :current="stepCurrent" :status="stepStatus">
          <n-step title="创建实验"> </n-step>

          <n-step title="设置参数"> </n-step>

          <n-step title="发布实验"> </n-step>
        </n-steps>
      </div>

      <StepOne v-if="stepCurrent === 1" />
      <StepTwo v-if="stepCurrent === 2" />
      <StepThree v-if="stepCurrent === 3" />

      <n-form-item>
        <n-space>
          <n-button @click="prev" v-if="stepCurrent > 1">
            <template #icon>
              <n-icon>
                <ArrowBackOutlined />
              </n-icon>
            </template>
            上一步
          </n-button>

          <n-button @click="submit" v-if="stepCurrent < stepCount">
            <template #icon>
              <n-icon>
                <ArrowForwardOutlined />
              </n-icon>
            </template>
            下一步
          </n-button>
        </n-space>
      </n-form-item>

      <n-form-item v-if="stepCurrent === 3">
        <n-space>
          <n-button type="primary" @click="submit"> 创建 </n-button>
          <n-button @click="reset"> 重置 </n-button>
        </n-space>
      </n-form-item>
    </n-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, provide } from 'vue'
import { StepsProps } from 'naive-ui'
import { useForm } from '@/hook'
import { stepRules, ExperimentForm } from '../options'
import StepOne from './stepOne.vue'
import StepTwo from './stepTwo.vue'
import StepThree from './stepThree.vue'
import { ArrowBackOutlined, ArrowForwardOutlined } from '@vicons/material'

const initValues: ExperimentForm = {
  name: '',
  date: null,
  timeArrange: null,
  remarks: '',
  migrationType: [],
  business: '',
  saveTime: null,
  otherType: [],
  deploy: [],
  strategies: '',
}

const { formRef, modelReactive, validateForm, resetModelReactive } = useForm(
  initValues,
  { isAsync: true }
)
provide('modelReactive', modelReactive)

const stepCount = 3
const stepCurrent = ref<number>(1)
const stepStatus = computed<StepsProps['status']>(() => {
  return stepCurrent.value === stepCount ? 'finish' : 'process'
})

const prev = () => {
  stepCurrent.value = stepCurrent.value - 1
}

const submit = (e: MouseEvent) =>
  validateForm(e, () => {
    stepCurrent.value = stepCurrent.value + 1
    console.log('我执行了', modelReactive.value)
  })

const reset = () => {
  resetModelReactive()
  stepCurrent.value = 1
}
</script>

<style lang="scss" scoped>
.step-form-wrap {
  height: calc(100vh - 160px);
  padding: 30px;
  background-color: var(--n-color);
}

.step-wrap {
  margin-bottom: 40px;
}
</style>
