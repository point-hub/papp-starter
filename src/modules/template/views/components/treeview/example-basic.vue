<script setup lang="ts">
import { ref } from 'vue'
import { BaseSwitch } from '@/components/index'
import { codeExample } from './example-basic'
import { BaseTreeview } from '@/components/index'

const codeToggle = ref(false)
</script>

<template>
  <div class="card card-template">
    <div class="card-header">
      <h2>Basic</h2>
      <component :is="BaseSwitch" v-model="codeToggle" label="code" />
    </div>
    <div class="flex flex-col">
      <component :is="BaseTreeview" title="Parent 1" :is-open="true">
        <component :is="BaseTreeview" title="Child 1" :is-open="true">
          <button class="btn btn-block space-x-4">
            <i class="i-fas-circle block h-2 w-2"></i>
            <p class="flex-1 text-left">Child 1.1</p>
          </button>
          <button class="btn btn-block space-x-4">
            <i class="i-fas-circle block h-2 w-2"></i>
            <p class="flex-1 text-left">Child 1.2</p>
          </button>
          <button class="btn btn-block space-x-4">
            <i class="i-fas-circle block h-2 w-2"></i>
            <p class="flex-1 text-left">Child 1.3</p>
          </button>
        </component>
        <component :is="BaseTreeview" title="Child 2">
          <button class="btn btn-block space-x-4">
            <i class="i-fas-circle block h-2 w-2"></i>
            <p class="flex-1 text-left">Child 2.1</p>
          </button>
          <button class="btn btn-block space-x-4">
            <i class="i-fas-circle block h-2 w-2"></i>
            <p class="flex-1 text-left">Child 2.2</p>
          </button>
          <button class="btn btn-block space-x-4">
            <i class="i-fas-circle block h-2 w-2"></i>
            <p class="flex-1 text-left">Child 2.3</p>
          </button>
        </component>
      </component>
      <component :is="BaseTreeview" title="Parent 2">
        <component :is="BaseTreeview" title="Child 1">
          <button class="btn btn-block space-x-4">
            <i class="i-fas-circle block h-2 w-2"></i>
            <p class="flex-1 text-left">Child 1.1</p>
          </button>
          <button class="btn btn-block space-x-4">
            <i class="i-fas-circle block h-2 w-2"></i>
            <p class="flex-1 text-left">Child 1.2</p>
          </button>
          <button class="btn btn-block space-x-4">
            <i class="i-fas-circle block h-2 w-2"></i>
            <p class="flex-1 text-left">Child 1.3</p>
          </button>
        </component>
        <component :is="BaseTreeview" title="Child 2">
          <button class="btn btn-block space-x-4">
            <i class="i-fas-circle block h-2 w-2"></i>
            <p class="flex-1 text-left">Child 2.1</p>
          </button>
          <button class="btn btn-block space-x-4">
            <i class="i-fas-circle block h-2 w-2"></i>
            <p class="flex-1 text-left">Child 2.2</p>
          </button>
          <button class="btn btn-block space-x-4">
            <i class="i-fas-circle block h-2 w-2"></i>
            <p class="flex-1 text-left">Child 2.3</p>
          </button>
        </component>
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
