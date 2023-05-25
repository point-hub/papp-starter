<script lang="ts">
interface Props {
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
import { computed, ref, onMounted, nextTick } from 'vue'

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
}>()

const value = computed({
  set: (text: string) => {
    emit('update:modelValue', text)
    resize()
  },
  get: () => props.modelValue
})

const height = ref(0)
const textareaRef = ref()

onMounted(() => {
  resize()
})

const resize = () => {
  height.value = 0
  nextTick(() => {
    height.value = textareaRef.value?.scrollHeight
  })
}
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
      <span v-if="props.description" class="text-xs font-light text-slate-500">{{
        props.description
      }}</span>
    </label>

    <div class="flex flex-1 flex-col">
      <textarea
        ref="textareaRef"
        placeholder="Type, paste, cut text here..."
        class="form-input resize-none overflow-hidden"
        :class="{
          'border-b border-x-none border-t-none px-1': border === 'simple',
          'border mt-1': border === 'full',
          'border-none': border === 'none'
        }"
        :style="{
          height: height + 'px'
        }"
        v-model="value"
      ></textarea>
      <slot name="helper" v-if="helper">
        <span class="text-sm font-light text-slate-500">{{ helper }}</span>
      </slot>
      <slot name="error" v-if="error">
        <span class="text-sm font-light text-danger">{{ error }}</span>
      </slot>
    </div>
  </div>
</template>
