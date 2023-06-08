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
      <h1>Select</h1>
      <base-divider orientation="horizontal" />
      <component
        :is="BaseBreadcrumb"
        :breadcrumbs="[
          { name: 'Template', path: '/template' },
          { name: 'Forms', path: '/template/forms' },
          { name: 'Select' }
        ]"
      />
    </div>
    <div class="main-content-body">
      <p>
        The select element is used to create a drop-down list. The select element is most often used
        in a form, to collect user input
      </p>
      <component :is="ExampleSimple" />
      <component :is="ExampleBordered" />
      <component :is="ExampleBorderless" />
    </div>
  </div>
</template>
