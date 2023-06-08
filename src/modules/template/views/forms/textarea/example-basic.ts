export const codeExample = `<script setup lang="ts">
import { ref } from 'vue'
import { BaseTextarea } from '@/components/index'

const text = ref('')
</script>

<template>
  <component :is="BaseTextarea" v-model="text" border="simple"></component>
<template>`
