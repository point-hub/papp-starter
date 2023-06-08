<script setup lang="ts">
import { BaseBreadcrumb } from '@/components/index'
import { BaseDivider } from '@/components/index'
import ExampleHorizontal from './example-horizontal.vue'
import ExamplePagination from './example-pagination.vue'
</script>

<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h1>Button Group</h1>
      <base-divider orientation="horizontal" />
      <component
        :is="BaseBreadcrumb"
        :breadcrumbs="[
          { name: 'Template', path: '/template' },
          { name: 'Components', path: '/template/components' },
          { name: 'Button Group' }
        ]"
      />
    </div>
    <div class="main-content-body">
      <p>Button groups are an easy way to group a series of buttons together.</p>
      <component :is="ExampleHorizontal" />
      <component :is="ExamplePagination" />
    </div>
  </div>
</template>
