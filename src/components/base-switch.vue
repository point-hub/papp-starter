<script setup lang="ts">
import { ref, watch } from 'vue'

export interface Props {
  modelValue: boolean
  label?: string
  labelPosition?: 'left' | 'right'
  disabled?: boolean
  size?: 'sm' | 'base' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  label: '',
  labelPosition: 'left',
  disabled: false,
  size: 'base'
})

const label = ref(props.label)
const modelValue = ref(props.modelValue)
const labelPosition = ref(props.labelPosition)
const disabled = ref(props.disabled)
const size = ref(props.size)

const emit = defineEmits(['update:modelValue'])

watch(modelValue, (newLoaded) => {
  emit('update:modelValue', newLoaded)
})
</script>

<template>
  <label
    class="inline-flex cursor-pointer select-none items-center gap-2"
    :class="{ 'flex-row-reverse ': labelPosition === 'right' }"
  >
    <slot name="label">{{ label }}</slot>
    <input
      v-model="modelValue"
      class="switch"
      type="checkbox"
      :disabled="disabled"
      :class="[
        {
          'switch-sm': size === 'sm',
          'switch-base': size === 'base',
          'switch-lg': size === 'lg',
          'switch-xl': size === 'xl',
          'switch-disabled': disabled
        }
      ]"
    />
  </label>
</template>

<style lang="postcss">
.switch::before {
  @apply absolute transition-all duration-200 ease-in-out content-empty top-2px left-2px h-[calc(100%-2px*2)] w-[calc((100%/2)-(2px*2))];
}

.switch {
  @apply select-none focus-visible:ring checked:before:translate-x-[calc(100%+(2px*2))] before:bg-slate-50;
  @apply relative shrink-0 cursor-pointer select-none appearance-none overflow-hidden outline-none focus:outline-none h-5 w-10 rounded-full before:rounded-full;
  @apply bg-slate-300 checked:bg-primary;
  @apply dark:bg-slate-600 dark:checked:bg-info;
}

.switch-disabled {
  @apply checked:bg-primary/50 dark:checked:bg-info/50;
}

/* switch size */
.switch-sm {
  @apply h-4 w-8;
}
.switch-base {
  @apply h-5 w-10;
}
.switch-lg {
  @apply h-6 w-12;
}
.switch-xl {
  @apply h-7 w-14;
}
</style>
