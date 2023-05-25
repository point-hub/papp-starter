export const codeExample = `<script setup lang="ts">
import BaseAccordion from '@/components/base-accordion.vue'
import BaseAccordionItem from '@/components/base-accordion-item.vue'
</script>

<template>
  <component :is="BaseAccordion" :alwaysOpen="true">
    <component :is="BaseAccordionItem" title="Collapsible #1" content="Hello World"></component>
    <component :is="BaseAccordionItem" title="Collapsible #2" content="Hello World"></component>
    <component :is="BaseAccordionItem" title="Collapsible #3" content="Hello World"></component>
  </component>
<template>`
