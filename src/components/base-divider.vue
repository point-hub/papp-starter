<script setup lang="ts">
const props = defineProps<{
  text?: string
  orientation: 'horizontal' | 'vertical'
}>()
</script>

<template>
  <div
    class="mx-4 flex flex-col items-center"
    :class="{
      'space-y-1': props.orientation === 'horizontal',
      'space-x-1': props.orientation === 'vertical'
    }"
  >
    <div
      class="flex-1 bg-slate-300 dark:bg-slate-700"
      :class="{
        'w-px': props.orientation === 'horizontal',
        'h-px': props.orientation === 'vertical'
      }"
    />
    <p v-if="text" class="text-xs text-slate-500">{{ props.text }}</p>
    <div
      v-if="text"
      :class="{
        'w-px': props.orientation === 'horizontal',
        'h-px': props.orientation === 'vertical'
      }"
      class="flex-1 bg-slate-300 dark:bg-slate-700"
    />
  </div>
</template>
