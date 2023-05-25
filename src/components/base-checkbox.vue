<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    required?: boolean
    disabled?: boolean
    label?: string
    theme?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger'
  }>(),
  {
    theme: 'primary'
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const value = computed({
  set: (text: boolean) => {
    emit('update:modelValue', text)
  },
  get: () => props.modelValue
})
</script>

<template>
  <label class="inline-flex cursor-pointer items-center space-x-2">
    <input
      v-model="value"
      :required="required"
      :disabled="disabled"
      class="form-checkbox h-5 w-5 rounded"
      :class="{
        'checked:border-primary checked:bg-primary border-primary': props.theme === 'primary',
        'checked:border-secondary checked:bg-secondary border-secondary':
          props.theme === 'secondary',
        'checked:border-info checked:bg-info border-info': props.theme === 'info',
        'checked:border-success checked:bg-success border-success': props.theme === 'success',
        'checked:border-warning checked:bg-warning border-warning': props.theme === 'warning',
        'checked:border-danger checked:bg-danger border-danger': props.theme === 'danger',
        'bg-slate-500!': props.disabled
      }"
      type="checkbox"
    />
    <p v-if="label">{{ label }}</p>
  </label>
</template>
