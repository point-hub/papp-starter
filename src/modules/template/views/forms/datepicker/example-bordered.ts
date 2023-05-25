export const codeExample = `<script setup lang="ts">
import { ref } from 'vue'
import BaseDatepicker from '@/components/base-datepicker.vue'

const date = ref()
</script>

<template>
  <component :is="BaseDatepicker" v-model="date" label="Date" border="full" />
<template>`
