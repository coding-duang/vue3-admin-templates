import { ref } from 'vue'
import { useDialog, DialogOptions } from 'naive-ui'
import { ActiveType } from '@/types'

export const useTableModal = (props: Record<string, any>) => {
  const dialog = useDialog()
  const showModal = ref(false)
  const openModal = (type: ActiveType, dialogError: DialogOptions = {}) => {
    type !== 'delete' ? (showModal.value = true) : dialog.error(dialogError)
    props.modalComponentProps.activeType = type
  }
  const setModal = (show: boolean) => (showModal.value = show)

  return {
    showModal,
    openModal,
    setModal,
  }
}
