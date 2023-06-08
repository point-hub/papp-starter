<script setup lang="ts">
import { ref } from 'vue'
import { BaseSwitch } from '@/components/index'
import { BaseModal } from '@/components/index'
import { codeExample } from './example-basic'

const showModal = ref(false)
const codeToggle = ref(false)
</script>

<template>
  <div class="card card-template">
    <div class="card-header">
      <h2>Basic</h2>
      <component :is="BaseSwitch" v-model="codeToggle" label="code" />
    </div>
    <div class="flex gap-4">
      <button class="btn btn-primary btn-base" @click="showModal = true">Open Modal</button>
      <component :is="BaseModal" :is-open="showModal" @on-close="showModal = false">
        <template #content>
          <div class="max-h-90vh overflow-auto p-4">
            <h2 class="py-4 text-2xl font-bold">Lorem Ipsum</h2>
            <div class="space-y-8">
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. A accusantium provident,
                blanditiis quam pariatur repellat? Animi ducimus fugit, similique libero et rem,
                quod repellat sunt itaque voluptas nihil saepe laboriosam?
              </p>
              <button class="btn btn-primary btn-block" @click="showModal = false">Close</button>
            </div>
          </div>
        </template>
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
