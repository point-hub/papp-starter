<script setup lang="ts">
import { ref } from 'vue'
import { BaseSwitch } from '@/components/index'
import { codeExample } from './example-basic'

const codeToggle = ref(false)
</script>

<template>
  <div class="card card-template">
    <div class="card-header">
      <h2>Basic</h2>
      <component :is="BaseSwitch" v-model="codeToggle" label="code" />
    </div>
    <div class="flex flex-wrap items-center gap-2">
      <ul class="breadcrumb-list">
        <li class="breadcrumb-item">
          <router-link class="breadcrumb-link" to="#">Template</router-link>
          <i class="i-fas-angle-right"></i>
        </li>
        <li class="breadcrumb-item">
          <router-link class="breadcrumb-link" to="#">Element</router-link>
          <i class="i-fas-angle-right"></i>
        </li>
        <li>Breadcrumb</li>
      </ul>
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
