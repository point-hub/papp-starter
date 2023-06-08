export const codeExample = `<script setup lang="ts">
import { ref } from 'vue'
import { BaseInputMask } from '@/components/index'

const input = ref()
</script>

<template>
  <component
    :is="BaseInputMask"
    v-model="input"
    :options="{ creditCard: true }"
    label="Credit Card"
    placeholder="**** **** **** ****"
    helper="this is helper message"
  ></component>
<template>`
