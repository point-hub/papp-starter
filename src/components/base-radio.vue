<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    name: string
    value: any
    modelValue: any
    required?: boolean
    label?: string
  }>(),
  {
    required: false
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
}>()

const valueModel = computed({
  set: (value: any) => {
    emit('update:modelValue', value)
  },
  get: () => props.modelValue
})
</script>

<template>
  <label class="flex items-center space-x-2">
    <input :name="name" type="radio" :value="value" v-model="valueModel" :required="required" />
    <div>
      <slot>
        <p v-if="label">{{ label }}</p>
      </slot>
    </div>
  </label>
</template>
