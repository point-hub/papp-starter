export const codeExample = `<script setup lang="ts">
import BaseAccordion from '@/components/base-accordion.vue'
import BaseAccordionItem from '@/components/base-accordion-item.vue'
</script>

<template>
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
<template>`
