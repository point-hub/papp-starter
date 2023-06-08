<script setup lang="ts">
import { BaseBreadcrumb } from '@/components/index'
import { BaseDivider } from '@/components/index'
import ExampleBordered from './example-bordered.vue'
import ExampleBorderless from './example-borderless.vue'
import ExampleSimple from './example-simple.vue'
</script>

<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h1>Autocomplete</h1>
      <base-divider orientation="horizontal" />
      <component
        :is="BaseBreadcrumb"
        :breadcrumbs="[
          { name: 'Template', path: '/template' },
          { name: 'Forms', path: '/template/forms' },
          { name: 'Autocomplete' }
        ]"
      />
    </div>
    <div class="main-content-body">
      <p>
        Autocomplete gives you a customizable select box with support for searching, tagging, remote
        data sets, infinite scrolling, and many other highly used options.
      </p>
      <component :is="ExampleSimple" />
      <component :is="ExampleBordered" />
      <component :is="ExampleBorderless" />
    </div>
  </div>
</template>
