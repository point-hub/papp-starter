<script setup lang="ts">
import { ref } from 'vue'
import { BaseSwitch } from '@/components/index'
import { codeExample } from './example-basic'

const codeToggle = ref(false)
</script>

<template>
  <div class="card card-template">
    <div class="card-header">
      <h2>Example</h2>
      <component :is="BaseSwitch" v-model="codeToggle" label="code" />
    </div>
    <div class="grid grid-cols-3 gap-4">
      <div class="card bg-primary p-4 text-white space-y-5">
        <h2 class="font-extrabold">Primary Card</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim facere cumque ipsam iusto
          nihil aperiam quasi repellendus nostrum assumenda odio provident accusamus reiciendis.
        </p>
      </div>
      <div class="card bg-secondary p-4 text-white space-y-5">
        <h2 class="font-extrabold">Secondary Card</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim facere cumque ipsam iusto
          nihil aperiam quasi repellendus nostrum assumenda odio provident accusamus reiciendis.
        </p>
      </div>
      <div class="card bg-info p-4 text-white space-y-5">
        <h2 class="font-extrabold">Info Card</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim facere cumque ipsam iusto
          nihil aperiam quasi repellendus nostrum assumenda odio provident accusamus reiciendis.
        </p>
      </div>
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
