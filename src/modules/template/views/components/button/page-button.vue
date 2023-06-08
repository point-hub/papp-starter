<script setup lang="ts">
import { BaseBreadcrumb } from '@/components/index'
import { BaseDivider } from '@/components/index'
import ExampleSolid from './example-solid.vue'
import ExampleRounded from './example-rounded.vue'
import ExampleOutline from './example-outline.vue'
import ExampleSize from './example-size.vue'
import ExampleDisabled from './example-disabled.vue'
import ExampleBlock from './example-block.vue'
import ExampleWithIcon from './example-with-icon.vue'
</script>

<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h1>Button</h1>
      <base-divider orientation="horizontal" />
      <component
        :is="BaseBreadcrumb"
        :breadcrumbs="[
          { name: 'Template', path: '/template' },
          { name: 'Components', path: '/template/components' },
          { name: 'Button' }
        ]"
      />
    </div>
    <div class="main-content-body">
      <p>
        Use Button component for actions in forms, dialogs, and more with support for multiple
        sizes, states, and more.
      </p>
      <component :is="ExampleSolid" />
      <component :is="ExampleRounded" />
      <component :is="ExampleOutline" />
      <component :is="ExampleSize" />
      <component :is="ExampleDisabled" />
      <component :is="ExampleBlock" />
      <component :is="ExampleWithIcon" />
    </div>
  </div>
</template>
