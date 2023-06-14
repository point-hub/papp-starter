<script lang="ts">
interface Props {
  modelValue: string | number
  id?: string
  label?: string
  description?: string
  placeholder?: string
  type?: 'text' | 'tel' | 'email' | 'password' | 'date' | 'number'
  border?: 'simple' | 'full' | 'none'
  layout?: 'vertical' | 'horizontal'
  required?: boolean
  readonly?: boolean
  disabled?: boolean
  helper?: string
  error?: string
}
</script>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useNumeric } from '@/composable/numeric'

const numeric = useNumeric()

const props = withDefaults(defineProps<Props>(), {
  border: 'simple',
  layout: 'vertical',
  type: 'text',
  required: false,
  readonly: false,
  disabled: false
})

const inputValue = ref(props.modelValue)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

watch(
  () => props.modelValue,
  () => {
    inputValue.value = numeric.format(props.modelValue)
  },
  {
    immediate: true
  }
)

watch(
  inputValue,
  () => {
    emit('update:modelValue', parseFloat(inputValue.value.toString().replace(/(\d+),(?=\d+(\D|$))/g, '$1')))
  },
  {
    immediate: true
  }
)
</script>

<template>
  <div
    class="w-full"
    :class="{
      'flex items-start gap-5': props.layout === 'horizontal'
    }"
  >
    <label
      :for="id"
      v-if="label"
      class="font-bold"
      :class="{
        'flex flex-col w-30% lg:w-20%': props.layout === 'horizontal',
        'text-sm': props.layout === 'vertical'
      }"
    >
      {{ label }}
      <span v-if="props.required" class="text-xs text-slate-400">(required)</span>
      <span v-if="props.description" class="text-xs font-light text-slate-500">
        {{ props.description }}
      </span>
    </label>

    <div class="flex flex-1 flex-col">
      <input
        class="form-input"
        :class="{
          'border-b border-x-none border-t-none px-1': border === 'simple',
          'border mt-1': border === 'full',
          'border-none': border === 'none'
        }"
        v-model.lazy="inputValue"
        v-cleave="{ numeral: true, numeralThousandsGroupStyle: 'thousand' }"
        :placeholder="props.placeholder"
        :required="props.required"
        :readonly="props.readonly"
        :disabled="props.disabled"
      />
      <slot name="helper" v-if="helper">
        <span class="text-sm font-light text-slate-500">{{ helper }}</span>
      </slot>
      <slot name="error" v-if="error">
        <span class="text-sm font-light text-danger">{{ error }}</span>
      </slot>
    </div>
  </div>
</template>
