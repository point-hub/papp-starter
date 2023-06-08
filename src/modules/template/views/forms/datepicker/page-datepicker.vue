<script setup lang="ts">
import { BaseBreadcrumb } from '@/components/index'
import { BaseDivider } from '@/components/index'
import ExampleBasic from './example-basic.vue'
import ExampleBordered from './example-bordered.vue'
import ExampleHorizontal from './example-horizontal.vue'
</script>

<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h1>Datepicker</h1>
      <base-divider orientation="horizontal" />
      <component
        :is="BaseBreadcrumb"
        :breadcrumbs="[
          { name: 'Template', path: '/template' },
          { name: 'Forms', path: '/template/forms' },
          { name: 'Datepicker' }
        ]"
      />
    </div>
    <div class="main-content-body">
      <p>
        The Datepicker is used to allow the user to select a date, and to display that date in the
        specified format.
      </p>
      <component :is="ExampleBasic" />
      <component :is="ExampleHorizontal" />
      <component :is="ExampleBordered" />
    </div>
  </div>
</template>
