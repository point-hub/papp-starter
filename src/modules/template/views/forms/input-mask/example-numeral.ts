export const codeExample = `<script setup lang="ts">
import { ref } from 'vue'
import { BaseInputMask } from '@/components/index'

const input = ref()
</script>

<template>
  <component
    :is="BaseInputMask"
    v-model="input"
    :options="{ numeral: true, numeralThousandsGroupStyle: 'thousand' }"
    label="Numeral"
    placeholder="1,234,567"
    error="this is error message"
  ></component>
<template>`
