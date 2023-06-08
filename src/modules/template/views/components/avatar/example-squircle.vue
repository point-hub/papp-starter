<script setup lang="ts">
import { ref } from 'vue'
import { BaseSwitch } from '@/components/index'
import { codeExample } from './example-squircle'

const codeToggle = ref(false)
</script>

<template>
  <div class="card card-template">
    <div class="card-header">
      <h2>Squircle</h2>
      <component :is="BaseSwitch" v-model="codeToggle" label="code" />
    </div>
    <div>
      <p>
        Avatars can have a squircle shape. To do this, you should use the
        <span class="highlight">mask mask-squircle</span> classes.
      </p>
    </div>
    <div class="flex flex-wrap items-center gap-2">
      <div class="avatar avatar-2xl">
        <img class="mask mask-squircle" src="https://via.placeholder.com/150" />
      </div>
      <div class="avatar avatar-xl">
        <img class="mask mask-squircle" src="https://via.placeholder.com/150" />
      </div>
      <div class="avatar avatar-lg">
        <img class="mask mask-squircle" src="https://via.placeholder.com/150" />
      </div>
      <div class="avatar avatar-base">
        <img class="mask mask-squircle" src="https://via.placeholder.com/150" />
      </div>
      <div class="avatar avatar-sm">
        <img class="mask mask-squircle" src="https://via.placeholder.com/150" />
      </div>
      <div class="avatar avatar-xs">
        <img class="mask mask-squircle" src="https://via.placeholder.com/150" />
      </div>
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
