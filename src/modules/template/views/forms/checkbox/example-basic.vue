<script setup lang="ts">
import { ref } from 'vue'
import { BaseSwitch } from '@/components/index'
import { BaseCheckbox } from '@/components/index'
import { codeExample } from './example-basic'

const primaryCheckbox = ref(false)
const secondaryCheckbox = ref(false)
const infoCheckbox = ref(false)
const successCheckbox = ref(false)
const warningCheckbox = ref(false)
const dangerCheckbox = ref(false)
const codeToggle = ref(false)
</script>

<template>
  <div class="card card-template">
    <div class="card-header">
      <h2>Basic</h2>
      <component :is="BaseSwitch" v-model="codeToggle" label="code" />
    </div>
    <div class="flex gap-4">
      <component :is="BaseCheckbox" v-model="primaryCheckbox" theme="primary" />
      <component :is="BaseCheckbox" v-model="secondaryCheckbox" theme="secondary" />
      <component :is="BaseCheckbox" v-model="infoCheckbox" theme="info" />
      <component :is="BaseCheckbox" v-model="successCheckbox" theme="success" />
      <component :is="BaseCheckbox" v-model="warningCheckbox" theme="warning" />
      <component :is="BaseCheckbox" v-model="dangerCheckbox" theme="danger" />
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
