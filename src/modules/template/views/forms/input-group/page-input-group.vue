<script setup lang="ts">
import { BaseBreadcrumb } from '@/components/index'
import { BaseDivider } from '@/components/index'
import ExampleBasic from './example-basic.vue'
import ExampleBordered from './example-bordered.vue'
import ExampleBorderless from './example-borderless.vue'
import ExampleHorizontal from './example-horizontal.vue'
</script>

<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h1>Input Group</h1>
      <base-divider orientation="horizontal" />
      <component
        :is="BaseBreadcrumb"
        :breadcrumbs="[
          { name: 'Template', path: '/template' },
          { name: 'Forms', path: '/template/forms' },
          { name: 'Input Group' }
        ]"
      />
    </div>
    <div class="main-content-body">
      <p>
        Easily extend form controls by adding text, buttons, or button groups on either side of
        textual inputs, custom selects, and custom file inputs.
      </p>
      <component :is="ExampleBasic" />
      <component :is="ExampleHorizontal" />
      <component :is="ExampleBordered" />
      <component :is="ExampleBorderless" />
    </div>
  </div>
</template>
