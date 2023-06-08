export const codeExample = `<script setup lang="ts">
import { ref } from 'vue'
import { BaseSwitch } from '@/components/index'

const checked = ref(false)
</script>

<template>
  <component :is="BaseSwitch" v-model="checked" label="Small" size="sm" />
  <component :is="BaseSwitch" v-model="checked" label="Base" size="base" />
  <component :is="BaseSwitch" v-model="checked" label="Large" size="lg" />
  <component :is="BaseSwitch" v-model="checked" label="Extra Large" size="xl" />
<template>`
