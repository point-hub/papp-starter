<script setup lang="ts">
import BaseBreadcrumb from '@/components/base-breadcrumb.vue'
import BaseDivider from '@/components/base-divider.vue'
import ExampleBasic from './example-basic.vue'
import ExampleDuration from './example-duration.vue'
</script>

<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h1>Notification</h1>
      <base-divider orientation="horizontal" />
      <component
        :is="BaseBreadcrumb"
        :breadcrumbs="[
          { name: 'Template', path: '/template' },
          { name: 'Components', path: '/template/components' },
          { name: 'Notification' }
        ]"
      />
    </div>
    <div class="main-content-body">
      <p>
        The toast component can be used to enhance your website’s interactivity by pushing
        notifications to your visitors. You can choose from multiple styles, colors, sizes, and
        positions and even dismiss the component
      </p>
      <component :is="ExampleBasic" />
      <component :is="ExampleDuration" />
    </div>
  </div>
</template>
