import { unref, Ref, UnwrapNestedRefs } from 'vue'
import { useForm, Options } from '../form'

export type Condition<T extends Object> = T | Ref<T> | UnwrapNestedRefs<T>

export const useCondition = <ConditionType extends Object>(
  condition: Condition<ConditionType>,
  options?: Options
) => {
  const { isCacheByPinia = false, storeId } = options

  const { modelReactive, store, formRef, validateForm, resetModelReactive } =
    useForm(unref(condition), {
      isCacheByPinia,
      storeId,
    })

  const setCondition = store
    ? store.setState
    : (condition: Condition<ConditionType>) => {
        Object.keys(modelReactive.value).forEach(key => {
          // @ts-ignore
          modelReactive.value[key] = unref(condition)[key]
        })
      }

  return {
    formRef,
    store,
    condition: modelReactive,
    validateForm,
    resetModelReactive,
    setCondition,
  }
}
