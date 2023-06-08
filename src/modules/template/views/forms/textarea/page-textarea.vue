<script setup lang="ts">
import { BaseBreadcrumb } from '@/components/index'
import { BaseDivider } from '@/components/index'
import ExampleBasic from './example-basic.vue'
import ExampleBordered from './example-bordered.vue'
import ExampleBorderless from './example-borderless.vue'
</script>

<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h1>Textarea</h1>
      <base-divider orientation="horizontal" />
      <component
        :is="BaseBreadcrumb"
        :breadcrumbs="[
          { name: 'Template', path: '/template' },
          { name: 'Forms', path: '/template/forms' },
          { name: 'Textarea' }
        ]"
      />
    </div>
    <div class="main-content-body">
      <p>
        The Textarea defines a multi-line text input control. The Textarea is often used in a form,
        to collect user inputs like comments or reviews.
      </p>
      <component :is="ExampleBasic" />
      <component :is="ExampleBordered" />
      <component :is="ExampleBorderless" />
    </div>
  </div>
</template>
