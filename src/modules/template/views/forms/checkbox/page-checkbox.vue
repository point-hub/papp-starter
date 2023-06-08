<script setup lang="ts">
import { BaseBreadcrumb } from '@/components/index'
import { BaseDivider } from '@/components/index'
import ExampleBasic from './example-basic.vue'
import ExampleLabel from './example-label.vue'
</script>

<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h1>Checkbox</h1>
      <base-divider orientation="horizontal" />
      <component
        :is="BaseBreadcrumb"
        :breadcrumbs="[
          { name: 'Template', path: '/template' },
          { name: 'Forms', path: '/template/forms' },
          { name: 'Checkbox' }
        ]"
      />
    </div>
    <div class="main-content-body">
      <p>
        Checkboxes are for selecting one or several options in a list, while radios are for
        selecting one option from many.
      </p>
      <component :is="ExampleBasic" />
      <component :is="ExampleLabel" />
    </div>
  </div>
</template>
