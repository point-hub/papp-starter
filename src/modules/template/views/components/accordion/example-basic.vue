<script setup lang="ts">
import { ref } from 'vue'
import { BaseSwitch } from '@/components/index'
import { BaseAccordion } from '@/components/index'
import { BaseAccordionItem } from '@/components/index'
import { codeExample } from './example-basic'

const codeToggle = ref(false)
</script>

<template>
  <div class="card card-template">
    <div class="card-header">
      <h2>Example</h2>
      <component :is="BaseSwitch" v-model="codeToggle" label="code" />
    </div>
    <div class="flex flex-col gap-4">
      <component :is="BaseAccordion">
        <component
          :is="BaseAccordionItem"
          :item-id="1"
          title="Accordion #1"
          content="Hello World"
        ></component>
        <component
          :is="BaseAccordionItem"
          :item-id="2"
          title="Accordion #2"
          content="Hello World"
        ></component>
        <component
          :is="BaseAccordionItem"
          :item-id="3"
          title="Accordion #3"
          content="Hello World"
        ></component>
      </component>
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
