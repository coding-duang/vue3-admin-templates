import { unref, Ref, UnwrapNestedRefs } from 'vue'
import { useForm, Options } from '../form'

type Condition =
  | Record<string, any>
  | Ref<Record<string, any>>
  | UnwrapNestedRefs<Record<string, any>>

export const useCondition = (condition: Condition, options?: Options) => {
  const { isCacheByPinia = false, storeId } = options
  const { modelReactive, store } = useForm(unref(condition), {
    isCacheByPinia,
    storeId,
  })

  return {
    store,
    condition: modelReactive,
  }
}
