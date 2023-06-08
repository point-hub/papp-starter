<script setup lang="ts">
import { BaseBreadcrumb } from '@/components/index'
import { BaseDivider } from '@/components/index'
import ExampleBasic from './example-basic.vue'
import ExampleInitial from './example-initial.vue'
import ExampleRounded from './example-rounded.vue'
import ExampleSquircle from './example-squircle.vue'
import ExampleIndicator from './example-indicator.vue'
import ExampleGroup from './example-group.vue'
import ExampleGroupWithIndicator from './example-group-with-indicator.vue'
import ExampleAnimate from './example-animate.vue'
</script>

<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h1>Avatar</h1>
      <base-divider orientation="horizontal" />
      <component
        :is="BaseBreadcrumb"
        :breadcrumbs="[
          { name: 'Template', path: '/template' },
          { name: 'Components', path: '/template/components' },
          { name: 'Avatar' }
        ]"
      />
    </div>
    <div class="main-content-body">
      <p>
        Use the avatar component to show a visual representation of a user profile using an image
        element or SVG object based on multiple styles and sizes
      </p>
      <component :is="ExampleBasic" />
      <component :is="ExampleInitial" />
      <component :is="ExampleRounded" />
      <component :is="ExampleSquircle" />
      <component :is="ExampleIndicator" />
      <component :is="ExampleGroup" />
      <component :is="ExampleGroupWithIndicator" />
      <component :is="ExampleAnimate" />
    </div>
  </div>
</template>
