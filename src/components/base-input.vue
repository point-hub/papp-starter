<script lang="ts">
interface Props {
  modelValue: string
  id?: string
  label?: string
  description?: string
  placeholder?: string
  type?: 'text' | 'tel' | 'email' | 'password' | 'date' | 'number'
  border?: 'none' | 'simple' | 'full'
  layout?: 'vertical' | 'horizontal'
  required?: boolean
  readonly?: boolean
  disabled?: boolean
  helper?: string
  error?: string
}
</script>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

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
  },
  get: () => props.modelValue
})

const prefixRef = ref()
const suffixRef = ref()
const paddingLeft = ref(0)
const paddingRight = ref(0)
onMounted(() => {
  paddingLeft.value = prefixRef.value.clientWidth === 0 ? 10 : prefixRef.value.clientWidth
  paddingRight.value = suffixRef.value.clientWidth === 0 ? 10 : suffixRef.value.clientWidth

  setTimeout(() => {
    paddingLeft.value = prefixRef.value.clientWidth === 0 ? 10 : prefixRef.value.clientWidth
    paddingRight.value = suffixRef.value.clientWidth === 0 ? 10 : suffixRef.value.clientWidth
  }, 1000)
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
      <div class="relative flex items-center">
        <input
          class="form-input"
          :class="{
            'border-b border-x-none border-t-none': border === 'simple',
            'border ': border === 'full',
            'border-none': border === 'none'
          }"
          v-model="value"
          :type="props.type"
          :placeholder="props.placeholder"
          :required="props.required"
          :readonly="props.readonly"
          :disabled="props.disabled"
          :style="{
            paddingLeft: `${paddingLeft}px`,
            paddingRight: `${paddingRight}px`
          }"
        />
        <div
          ref="suffixRef"
          class="pointer-events-none absolute right-0 h-full flex items-center justify-center text-slate-400 dark:text-slate-300"
        >
          <slot name="suffix"></slot>
        </div>
        <div
          ref="prefixRef"
          class="pointer-events-none absolute h-full flex items-center justify-center text-slate-400 dark:text-slate-300"
        >
          <slot name="prefix"></slot>
        </div>
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

<style lang="postcss">
table input.border-none {
  @apply p-0!;
}
</style>
