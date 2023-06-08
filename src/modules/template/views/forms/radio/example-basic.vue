<script setup lang="ts">
import { ref } from 'vue'
import { BaseSwitch } from '@/components/index'
import { BaseRadio } from '@/components/index'
import { codeExample } from './example-basic'

const selected = ref('')
const codeToggle = ref(false)
</script>

<template>
  <div class="card card-template">
    <div class="card-header">
      <h2>Example</h2>
      <component :is="BaseSwitch" v-model="codeToggle" label="code" />
    </div>
    <div class="flex flex-col gap-4">
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
