<script setup lang="ts">
import { BaseBreadcrumb } from '@/components/index'
import { BaseDivider } from '@/components/index'
import ExampleBasic from './example-basic.vue'
import ExampleVertical from './example-vertical.vue'
</script>

<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h1>Tabs</h1>
      <base-divider orientation="horizontal" />
      <component
        :is="BaseBreadcrumb"
        :breadcrumbs="[
          { name: 'Template', path: '/template' },
          { name: 'Components', path: '/template/components' },
          { name: 'Tabs' }
        ]"
      />
    </div>
    <div class="main-content-body">
      <p>
        The tabs component can be used either as an extra navigational hierarchy complementing the
        main navbar or you can also use it to change content inside a container
      </p>
      <component :is="ExampleBasic" />
      <component :is="ExampleVertical" />
    </div>
  </div>
</template>
