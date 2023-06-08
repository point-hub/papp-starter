export const codeExample = `<script setup lang="ts">
import { BaseDropdown } from '@/components/index'
</script>

<template>
  <component :is="BaseDropdown">
    <div class="p-1">
      <div class="p-2 flex items-center gap-2">
        <i class="i-far-pen-to-square block"></i>
        <span>Edit</span>
      </div>
      <div class="p-2 flex items-center gap-2">
        <i class="i-far-copy block"></i>
        <span>Duplicate</span>
      </div>
    </div>
    <div class="p-1">
      <div class="p-2 flex items-center gap-2">
        <i class="i-far-box-archive block"></i>
        <span>Archive</span>
      </div>
      <div class="p-2 flex items-center gap-2">
        <i class="i-far-arrow-up-right-from-square block"></i>
        <span>Move</span>
      </div>
    </div>
    <div class="p-1">
      <div class="p-2 flex items-center gap-2">
        <i class="i-far-trash block"></i>
        <span>Delete</span>
      </div>
    </div>
  </component>
<template>`
