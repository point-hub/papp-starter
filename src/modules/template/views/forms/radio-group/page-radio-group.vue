<script setup lang="ts">
import { BaseBreadcrumb } from '@/components/index'
import { BaseDivider } from '@/components/index'
import ExampleBasic from './example-basic.vue'
</script>

<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h1>Radio Group</h1>
      <base-divider orientation="horizontal" />
      <component
        :is="BaseBreadcrumb"
        :breadcrumbs="[
          { name: 'Template', path: '/template' },
          { name: 'Form', path: '/template/Form' },
          { name: 'Radio Group' }
        ]"
      />
    </div>
    <div class="main-content-body">
      <p>
        Radio are generally used in radio groups collections of radio buttons describing a set of
        related options.
      </p>
      <component :is="ExampleBasic" />
    </div>
  </div>
</template>
