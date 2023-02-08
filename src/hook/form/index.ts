import { ref, unref } from 'vue'
import { cloneDeep } from 'lodash-es'
import { createDynamicStore } from '@/store'
import { FormInst, createDiscreteApi } from 'naive-ui'

type Options = {
  isAsync: boolean
  isCacheByPinia?: boolean
  storeId?: string
  callback?: (...args: any[]) => void
}

export const useForm = <M extends object>(
  formModel: Partial<M> = {},
  options: Options
) => {
  const { isAsync = false, isCacheByPinia = false, storeId, callback } = options

  const store = isCacheByPinia
    ? createDynamicStore<Partial<M>>(storeId, formModel)()
    : null

  const cloneModel = cloneDeep(formModel)
  const { message } = createDiscreteApi(['message'])
  const formRef = ref<FormInst | null>(null)
  const model = isCacheByPinia ? unref(store.getState) : formModel
  const modelReactive = ref(model)

  const validateForm = (e: MouseEvent) => {
    e.preventDefault()
    const messageReactive = isAsync
      ? message.loading('校验中...', { duration: 0 })
      : null

    formRef.value?.validate(async errors => {
      if (!errors) {
        message.success('valid!')
        callback && (await callback())
        return
      }
      message.error('invalid!')
      messageReactive.destroy()
    })
  }
  const resetModelReactive = () => {
    Object.keys(modelReactive.value).forEach(key => {
      modelReactive.value[key as keyof M] = cloneModel[key as keyof M]
      isCacheByPinia && store?.setState(cloneModel)
    })
  }

  return {
    store,
    formRef,
    modelReactive,
    validateForm,
    resetModelReactive,
  }
}
