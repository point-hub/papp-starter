export const codeExample = `<script setup lang="ts">
import { ref } from 'vue'
import { BaseSwitch } from '@/components/index'

const checked = ref(false)
</script>

<template>
  <component :is="BaseSwitch" v-model="checked" />
<template>`
