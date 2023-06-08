export const codeExample = `<script setup lang="ts">
import { BaseTreeview } from '@/components/index'
</script>

<template>
  <component :is="BaseTreeview" :is-open="true">
    <template #header="slotProps">
      <i
        class="i-far-folder"
        :class="{
          'i-far-folder-open': slotProps.isOpen
        }"
      ></i>
      <p class="flex-1 text-left">Parent 1</p>
    </template>
    <component :is="BaseTreeview" :is-open="true">
      <template #header="slotProps">
        <i
          class="i-far-folder"
          :class="{
            'i-far-folder-open': slotProps.isOpen
          }"
        ></i>
        <p class="flex-1 text-left">Child 1</p>
      </template>
      <button class="btn btn-block space-x-4">
        <i class="i-far-file-lines block w-4 h-4"></i>
        <p class="flex-1 text-left">Child 1.1</p>
      </button>
      <button class="btn btn-block space-x-4">
        <i class="i-far-file-lines block w-4 h-4"></i>
        <p class="flex-1 text-left">Child 1.2</p>
      </button>
      <button class="btn btn-block space-x-4">
        <i class="i-far-file-lines block w-4 h-4"></i>
        <p class="flex-1 text-left">Child 1.3</p>
      </button>
    </component>
    <component :is="BaseTreeview">
      <template #header="slotProps">
        <i
          class="i-far-folder"
          :class="{
            'i-far-folder-open': slotProps.isOpen
          }"
        ></i>
        <p class="flex-1 text-left">Child 2</p>
      </template>
      <button class="btn btn-block space-x-4">
        <i class="i-far-file-lines block w-4 h-4"></i>
        <p class="flex-1 text-left">Child 2.1</p>
      </button>
      <button class="btn btn-block space-x-4">
        <i class="i-far-file-lines block w-4 h-4"></i>
        <p class="flex-1 text-left">Child 2.2</p>
      </button>
      <button class="btn btn-block space-x-4">
        <i class="i-far-file-lines block w-4 h-4"></i>
        <p class="flex-1 text-left">Child 2.3</p>
      </button>
    </component>
  </component>
  <component :is="BaseTreeview">
    <template #header="slotProps">
      <i
        class="i-far-folder"
        :class="{
          'i-far-folder-open': slotProps.isOpen
        }"
      ></i>
      <p class="flex-1 text-left">Parent 2</p>
    </template>
    <component :is="BaseTreeview">
      <template #header="slotProps">
        <i
          class="i-far-folder"
          :class="{
            'i-far-folder-open': slotProps.isOpen
          }"
        ></i>
        <p class="flex-1 text-left">Child 1</p>
      </template>
      <button class="btn btn-block space-x-4">
        <i class="i-far-file-lines block w-4 h-4"></i>
        <p class="flex-1 text-left">Child 1.1</p>
      </button>
      <button class="btn btn-block space-x-4">
        <i class="i-far-file-lines block w-4 h-4"></i>
        <p class="flex-1 text-left">Child 1.2</p>
      </button>
      <button class="btn btn-block space-x-4">
        <i class="i-far-file-lines block w-4 h-4"></i>
        <p class="flex-1 text-left">Child 1.3</p>
      </button>
    </component>
    <component :is="BaseTreeview">
      <template #header="slotProps">
        <i
          class="i-far-folder"
          :class="{
            'i-far-folder-open': slotProps.isOpen
          }"
        ></i>
        <p class="flex-1 text-left">Child 2</p>
      </template>
      <button class="btn btn-block space-x-4">
        <i class="i-far-file-lines block w-4 h-4"></i>
        <p class="flex-1 text-left">Child 2.1</p>
      </button>
      <button class="btn btn-block space-x-4">
        <i class="i-far-file-lines block w-4 h-4"></i>
        <p class="flex-1 text-left">Child 2.2</p>
      </button>
      <button class="btn btn-block space-x-4">
        <i class="i-far-file-lines block w-4 h-4"></i>
        <p class="flex-1 text-left">Child 2.3</p>
      </button>
    </component>
  </component>
<template>`
