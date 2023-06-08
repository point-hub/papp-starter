<script setup lang="ts">
import { BaseBreadcrumb } from '@/components/index'
import { BaseDivider } from '@/components/index'
import ExampleHorizontal from './example-horizontal.vue'
import ExampleHorizontalWithText from './example-horizontal-with-text.vue'
import ExampleVertical from './example-vertical.vue'
import ExampleVerticalWithText from './example-vertical-with-text.vue'
</script>

<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h1>Divider</h1>
      <base-divider orientation="horizontal" />
      <component
        :is="BaseBreadcrumb"
        :breadcrumbs="[
          { name: 'Template', path: '/template' },
          { name: 'Components', path: '/template/components' },
          { name: 'Divider' }
        ]"
      />
    </div>
    <div class="main-content-body">
      <p>Divider is nothing but a partitioning element that has specific dimensions</p>
      <component :is="ExampleHorizontal" />
      <component :is="ExampleHorizontalWithText" />
      <component :is="ExampleVertical" />
      <component :is="ExampleVerticalWithText" />
    </div>
  </div>
</template>
