<script setup lang="ts">
import { ref } from 'vue'
import { BaseSwitch } from '@/components/index'
import { codeExample } from './example-basic'

const inputRange = ref(0)
const codeToggle = ref(false)
</script>

<template>
  <div class="card card-template">
    <div class="card-header">
      <h2>Example</h2>
      <component :is="BaseSwitch" v-model="codeToggle" label="code" />
    </div>
    <div>
      <p>
        Let the user specify a numeric value which must be no less than a given value, and no more
        than another given value. The precise value, however, is not considered important. This is
        typically represented using a slider or dial control rather than a text entry box like the
        number input type.
      </p>
    </div>
    <div class="flex flex-col gap-4">
      <div>Value : {{ inputRange }}</div>
      <form @submit.prevent="" class="flex flex-col gap-4">
        <input type="range" class="w-full" min="0" max="100" v-model="inputRange" />
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
