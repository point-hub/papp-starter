export const codeExample = `<script setup lang="ts">
import { ref } from 'vue'
import { BaseInputMask } from '@/components/index'

const input = ref()
</script>

<template>
  <component
    :is="BaseInputMask"
    v-model="input"
    :options="{ date: true, delimiter: '-', datePattern: ['d', 'm', 'Y'] }"
    label="Date"
    placeholder="DD-MM-YYYY"
  ></component>
<template>`
