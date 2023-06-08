export const codeExample = `<script setup lang="ts">
import { BaseTreeview } from '@/components/index'
</script>

<template>
  <component :is="BaseTreeview" title="Parent 1" :is-open="true">
    <component :is="BaseTreeview" title="Child 1" :is-open="true">
      <button class="btn btn-block space-x-4">
        <i class="i-fas-circle block w-2 h-2"></i>
        <p class="flex-1 text-left">Child 1.1</p>
      </button>
      <button class="btn btn-block space-x-4">
        <i class="i-fas-circle block w-2 h-2"></i>
        <p class="flex-1 text-left">Child 1.2</p>
      </button>
      <button class="btn btn-block space-x-4">
        <i class="i-fas-circle block w-2 h-2"></i>
        <p class="flex-1 text-left">Child 1.3</p>
      </button>
    </component>
    <component :is="BaseTreeview" title="Child 2">
      <button class="btn btn-block space-x-4">
        <i class="i-fas-circle block w-2 h-2"></i>
        <p class="flex-1 text-left">Child 2.1</p>
      </button>
      <button class="btn btn-block space-x-4">
        <i class="i-fas-circle block w-2 h-2"></i>
        <p class="flex-1 text-left">Child 2.2</p>
      </button>
      <button class="btn btn-block space-x-4">
        <i class="i-fas-circle block w-2 h-2"></i>
        <p class="flex-1 text-left">Child 2.3</p>
      </button>
    </component>
  </component>
  <component :is="BaseTreeview" title="Parent 2">
    <component :is="BaseTreeview" title="Child 1">
      <button class="btn btn-block space-x-4">
        <i class="i-fas-circle block w-2 h-2"></i>
        <p class="flex-1 text-left">Child 1.1</p>
      </button>
      <button class="btn btn-block space-x-4">
        <i class="i-fas-circle block w-2 h-2"></i>
        <p class="flex-1 text-left">Child 1.2</p>
      </button>
      <button class="btn btn-block space-x-4">
        <i class="i-fas-circle block w-2 h-2"></i>
        <p class="flex-1 text-left">Child 1.3</p>
      </button>
    </component>
    <component :is="BaseTreeview" title="Child 2">
      <button class="btn btn-block space-x-4">
        <i class="i-fas-circle block w-2 h-2"></i>
        <p class="flex-1 text-left">Child 2.1</p>
      </button>
      <button class="btn btn-block space-x-4">
        <i class="i-fas-circle block w-2 h-2"></i>
        <p class="flex-1 text-left">Child 2.2</p>
      </button>
      <button class="btn btn-block space-x-4">
        <i class="i-fas-circle block w-2 h-2"></i>
        <p class="flex-1 text-left">Child 2.3</p>
      </button>
    </component>
  </component>
<template>`
