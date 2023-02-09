import { unref, Ref, UnwrapNestedRefs } from 'vue'
import { useForm, Options } from '../form'

export type Condition<T extends Object> = T | Ref<T> | UnwrapNestedRefs<T>

export const useCondition = <ConditionType extends Object>(
  condition: Condition<ConditionType>,
  options?: Options
) => {
  const { isCacheByPinia = false, storeId } = options

  const { modelReactive, store } = useForm(unref(condition), {
    isCacheByPinia,
    storeId,
  })

  const setCondition = (condition: Condition<ConditionType>) => {
    Object.keys(modelReactive.value).forEach(key => {
      // @ts-ignore
      modelReactive.value[key] = unref(condition)[key]
    })
  }

  return {
    store,
    condition: modelReactive,
    setCondition,
  }
}
