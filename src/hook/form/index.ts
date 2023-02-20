import { ref, unref } from 'vue'
import { cloneDeep } from 'lodash-es'
import { createDynamicStore } from '@/store'
import { FormInst, useMessage } from 'naive-ui'

export type Options = {
  isAsync?: boolean
  isCacheByPinia?: boolean
  storeId?: string
  callback?: (...args: any[]) => void
}

export const useForm = <M extends object>(
  formModel: Partial<M> = {},
  options: Options = {}
) => {
  const { isAsync = false, isCacheByPinia = false, storeId } = options

  const store = isCacheByPinia
    ? createDynamicStore<Partial<M>>(storeId, formModel)()
    : null

  const cloneModel = cloneDeep(formModel)
  const message = useMessage()
  const formRef = ref<FormInst | null>(null)
  const model = isCacheByPinia ? unref<Partial<M>>(store.getState) : formModel
  const modelReactive = ref(model)

  const validateForm = (e: MouseEvent, callback?: (...args: any[]) => void) => {
    e.preventDefault()

    formRef.value?.validate(async errors => {
      const messageReactive = isAsync ? message.loading('校验中...') : null

      if (errors) {
        messageReactive && messageReactive.destroy()
        message.error('校验失败!')
        return
      }
      console.log('这是验证通过的表单数据:', modelReactive.value)
      callback && (await callback(modelReactive.value))
      messageReactive && messageReactive.destroy()
    })
  }
  const resetModelReactive = (model?: Partial<M>) => {
    Object.keys(modelReactive.value).forEach(key => {
      modelReactive.value[key as keyof M] = model
        ? model[key as keyof M]
        : cloneModel[key as keyof M]
      isCacheByPinia && store?.setState(cloneModel)
    })
    console.log(modelReactive.value)
  }

  return {
    store,
    formRef,
    modelReactive,
    validateForm,
    resetModelReactive,
  }
}
