export const codeExample = `<script setup lang="ts">
import { ref } from 'vue'
import { BaseSwitch } from '@/components/index'

const checked = ref(false)
</script>

<template>
  <component :is="BaseSwitch" v-model="switchValue" :disabled="true" />
  <component :is="BaseSwitch" v-model="switchValue2" :disabled="true" />
<template>`
