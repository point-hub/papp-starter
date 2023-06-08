<script setup lang="ts">
import { BaseBreadcrumb } from '@/components/index'
import { BaseDivider } from '@/components/index'
import ExampleDirective from './example-directive.vue'
import ExampleSlot from './example-slot.vue'
</script>

<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h1>Tooltip</h1>
      <base-divider orientation="horizontal" />
      <component
        :is="BaseBreadcrumb"
        :breadcrumbs="[
          { name: 'Template', path: '/template' },
          { name: 'Components', path: '/template/components' },
          { name: 'Tooltip' }
        ]"
      />
    </div>
    <div class="main-content-body">
      <p>
        A Spinner component is used to show the user a timely process is currently taking place.
      </p>
      <component :is="ExampleDirective" />
      <component :is="ExampleSlot" />
    </div>
  </div>
</template>
