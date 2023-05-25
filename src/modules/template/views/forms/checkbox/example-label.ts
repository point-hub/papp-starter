export const codeExample = `<script setup lang="ts">
import { ref } from 'vue'
import BaseCheckbox from '@/components/base-checkbox.vue'

const checked = ref(false)
</script>

<template>
  <component :is="BaseCheckbox" v-model="checked" label="Primary" />
<template>`
