export const codeExample = `<script setup lang="ts">
import { ref } from 'vue'
import { BaseRadio } from '@/components/index'

const selected = ref('')
</script>

<template>
  <div>Selected : {{ selected }}</div>
  <form @submit.prevent="" class="flex gap-4">
    <component
      :is="BaseRadio"
      name="radio-option"
      value="value 1"
      v-model="selected"
      :required="true"
    >
      Value 1
    </component>
    <component
      :is="BaseRadio"
      name="radio-option"
      value="value 2"
      v-model="selected"
      :required="true"
    >
      Value 2
    </component>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
<template>`
