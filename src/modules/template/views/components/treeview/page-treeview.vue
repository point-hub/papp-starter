<script setup lang="ts">
import { BaseBreadcrumb } from '@/components/index'
import { BaseDivider } from '@/components/index'
import ExampleBasic from './example-basic.vue'
import ExampleSlot from './example-slot.vue'
</script>

<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h1>Treeview</h1>
      <base-divider orientation="horizontal" />
      <component
        :is="BaseBreadcrumb"
        :breadcrumbs="[
          { name: 'Template', path: '/template' },
          { name: 'Components', path: '/template/components' },
          { name: 'Treeview' }
        ]"
      />
    </div>
    <div class="main-content-body">
      <p>
        A tree view represents a hierarchical view of information, where each item can have a number
        of subitems.
      </p>
      <component :is="ExampleBasic" />
      <component :is="ExampleSlot" />
    </div>
  </div>
</template>
