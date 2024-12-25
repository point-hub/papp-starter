<script setup lang="ts">
import { useDarkMode, useScreenSize } from '@point-hub/papp'
import { onMounted, provide, ref } from 'vue'
import { RouterView } from 'vue-router'

const { setDarkMode } = useDarkMode()

export interface IToastRef {
  toast(
    message: string,
    options?: {
      lists?: string[]
      color?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger'
      autoClose?: boolean
      timer?: number
    }
  ): void
}

/**
 * Provide the `toastRef` to be used in another component.
 *
 * Example:
 * import { inject, type Ref } from 'vue'
 * import type { IToastRef } from '@/main-app.vue'
 * const toastRef = inject<Ref<IToastRef>>('toastRef')
 * toastRef?.value.toast('This is an error message', { color: 'danger' })
 */
const toastRef = ref<IToastRef>()
provide('toastRef', toastRef)

/**
 * Track breakpoint on screen change
 */
useScreenSize()

/**
 * the onMounted lifecycle hook is used to perform actions
 * when a component has been mounted to the DOM
 */
onMounted(() => {
  /**
   * Set default darkmode to light
   */
  setDarkMode('light')
})
</script>

<template>
  <RouterView />
  <!-- Toast Notification Component -->
  <base-toast ref="toastRef" />
</template>

<style scoped></style>
