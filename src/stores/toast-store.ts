import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastStore = defineStore('toast-store', () => {
  const toastRef = ref()

  return { toastRef }
})
