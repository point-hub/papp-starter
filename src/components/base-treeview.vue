<script setup lang="ts">
import { ref, watch } from 'vue'

const isOpen = ref(false)
const content = ref()

const toggleCollapse = () => {
  isOpen.value = !isOpen.value
}

const props = withDefaults(
  defineProps<{
    title?: string
    isOpen?: boolean
  }>(),
  { title: '', isOpen: false }
)

watch(
  props,
  () => {
    isOpen.value = props.isOpen
  },
  { immediate: true }
)
</script>

<template>
  <div class="">
    <button @click="toggleCollapse()" class="btn btn-block space-x-4">
      <slot name="header" :is-open="isOpen">
        <i
          class="i-fas-angle-right transform-gpu transition-all duration-200"
          :class="{
            'rotate-90': isOpen
          }"
        ></i>
        <p class="flex-1 text-left">{{ props.title }}</p>
      </slot>
    </button>
    <div v-if="isOpen" ref="content" class="overflow-hidden px-4">
      <slot></slot>
    </div>
  </div>
</template>
