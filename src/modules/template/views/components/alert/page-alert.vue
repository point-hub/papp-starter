<script setup lang="ts">
import { BaseBreadcrumb } from '@/components/index'
import { BaseDivider } from '@/components/index'
import ExampleSolid from './example-solid.vue'
import ExampleOutline from './example-outline.vue'
import ExampleIndicator from './example-indicator.vue'
import ExampleWithIcon from './example-with-icon.vue'
</script>

<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h1>Alert</h1>
      <base-divider orientation="horizontal" />
      <component
        :is="BaseBreadcrumb"
        :breadcrumbs="[
          { name: 'Template', path: '/template' },
          { name: 'Components', path: '/template/components' },
          { name: 'Alert' }
        ]"
      />
    </div>
    <div class="main-content-body">
      <p>
        The alert component can be used to provide information to your users such as success or
        error messages, but also highlighted information complementing the normal flow of paragraphs
        and headers on a page.
      </p>
      <component :is="ExampleSolid" />
      <component :is="ExampleOutline" />
      <component :is="ExampleIndicator" />
      <component :is="ExampleWithIcon" />
    </div>
  </div>
</template>
