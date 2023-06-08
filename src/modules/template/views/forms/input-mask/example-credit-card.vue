<script setup lang="ts">
import { ref } from 'vue'
import { BaseSwitch } from '@/components/index'
import { BaseInputMask } from '@/components/index'
import { codeExample } from './example-credit-card'

const input = ref()
const codeToggle = ref(false)
</script>

<template>
  <div class="card card-template">
    <div class="card-header">
      <h2>Credit Card</h2>
      <component :is="BaseSwitch" v-model="codeToggle" label="code" />
    </div>
    <div class="flex gap-4">
      <component
        :is="BaseInputMask"
        v-model="input"
        :options="{ creditCard: true }"
        label="Credit Card"
        placeholder="**** **** **** ****"
        helper="this is helper message"
      ></component>
    </div>
    <div
      class="card-code"
      :class="{
        'card-code-active': codeToggle,
        'card-code-inactive': !codeToggle
      }"
    >
      <div class="card-code-label">vue</div>
      <highlightjs autodetect :code="codeExample" />
    </div>
  </div>
</template>
