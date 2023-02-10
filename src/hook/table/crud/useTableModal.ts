import { ref } from 'vue'

export const useTableModal = () => {
  const showModal = ref(false)
  const openModal = () => (showModal.value = true)
  return {
    showModal,
    openModal,
  }
}
