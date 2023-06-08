<script setup lang="ts">
import { ref } from 'vue'
import { BaseSwitch } from '@/components/index'
import { codeExample } from './example-basic'

const codeToggle = ref(false)
</script>

<template>
  <div class="card card-template">
    <div class="card-header">
      <h2>Title</h2>
      <component :is="BaseSwitch" v-model="codeToggle" label="code" />
    </div>
    <div>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum reprehenderit minus quas
        cupiditate deleniti sint repellendus nesciunt commodi ducimus voluptatem repudiandae
        consequatur magni, dolore non tempora at quis? Quaerat, possimus.
      </p>
    </div>
    <div class="flex flex-col gap-4">
      <div>Code example</div>
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
