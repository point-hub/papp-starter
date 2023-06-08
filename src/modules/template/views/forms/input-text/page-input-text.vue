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
      <h1>Input Text</h1>
      <base-divider orientation="horizontal" />
      <component
        :is="BaseBreadcrumb"
        :breadcrumbs="[
          { name: 'Template', path: '/template' },
          { name: 'Forms', path: '/template/forms' },
          { name: 'Input Text' }
        ]"
      />
    </div>
    <div class="main-content-body">
      <p>
        The input element with a type attribute whose value is "text" represents a one-line plain
        text edit control for the input element’s value.
      </p>
      <component :is="ExampleBasic" />
      <component :is="ExampleHorizontal" />
      <component :is="ExampleBordered" />
    </div>
  </div>
</template>
