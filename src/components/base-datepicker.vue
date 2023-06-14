<script lang="ts">
export interface Props {
  modelValue: string
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
import dayjs from 'dayjs'
import { ref, watch, computed } from 'vue'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

const props = withDefaults(defineProps<Props>(), {
  border: 'simple',
  layout: 'vertical',
  type: 'text',
  required: false,
  readonly: false,
  disabled: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'isoValue', value: string): void
}>()

const value = computed({
  set: (text: string) => {
    emit('isoValue', dayjs(text, 'DD/MM/YYYY').toISOString())
    emit('update:modelValue', text)
  },
  get: () => props.modelValue
})

/**
 * HTMLInputElement.showPicker()
 *
 * This is the same picker that would normally be displayed when the element
 * is selected, but can be triggered from a button press or other user interaction.
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/showPicker
 */
const dateRef = ref()
const onClickDateRef = () => {
  if (!props.readonly) {
    dateRef.value.showPicker()
  }
}
const nativeDate = ref()

watch(nativeDate, (newValue) => {
  value.value = dayjs(new Date(newValue)).format('DD-MM-YYYY')
})
</script>

<template>
  <div
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
      <div class="relative">
        <input ref="dateRef" v-model="nativeDate" type="date" class="form-input absolute -z-50" />
        <button type="button" class="absolute right-0 top-1 px-4 py-2" @click="onClickDateRef()">
          <i class="i-far-calendar block"></i>
        </button>
        <input
          v-model.lazy="value"
          v-cleave="{ date: true, delimiter: '-', datePattern: ['d', 'm', 'Y'] }"
          type="text"
          class="form-input"
          :class="{
            'border-b border-x-none border-t-none px-1': border === 'simple',
            border: border === 'full',
            'border-none': border === 'none'
          }"
          placeholder="DD-MM-YYYY"
          :required="props.required"
          :readonly="props.readonly"
          :disabled="props.disabled"
        />
      </div>
      <slot name="helper" v-if="helper">
        <span class="text-sm text-slate-500">{{ helper }}</span>
      </slot>
      <slot name="error" v-if="error">
        <span class="text-sm text-danger">{{ error }}</span>
      </slot>
    </div>
  </div>
</template>
