export const codeExample = `<script setup lang="ts">
import { BaseSelect } from '@/components/index'

const list = [
  { id: 1, label: 'Durward Reynolds' },
  { id: 2, label: 'Kenton Towne' },
  { id: 3, label: 'Therese Wunsch' },
  { id: 4, label: 'Benedict Kessler' }
]

const selected = ref({})
const selected2 = ref(list[0])
</script>

<template>
<component :is="BaseSelect" v-model="selected" :list="list" border="none"></component>
<component :is="BaseSelect" v-model="selected2" :list="list" border="none"></component>
<template>`
