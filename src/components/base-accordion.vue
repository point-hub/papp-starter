<script setup lang="ts">
import { ref, provide } from 'vue'

const props = withDefaults(
  defineProps<{
    alwaysOpen?: boolean
  }>(),
  { alwaysOpen: false }
)

const alwaysOpen = ref(props.alwaysOpen)
const activeItemId = ref(0)

provide('alwaysOpen', alwaysOpen)
provide('activeItemId', activeItemId)
</script>

<template>
  <slot></slot>
</template>
