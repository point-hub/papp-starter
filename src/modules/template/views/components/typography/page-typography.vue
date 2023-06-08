<script setup lang="ts">
import { BaseBreadcrumb } from '@/components/index'
import { BaseDivider } from '@/components/index'
import ExampleBasic from './example-basic.vue'
import ExampleBold from './example-bold.vue'
</script>

<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h1 class="heading2">Typography</h1>
      <base-divider orientation="horizontal" />
      <component
        :is="BaseBreadcrumb"
        :breadcrumbs="[
          { name: 'Template', path: '/template' },
          { name: 'Components', path: '/template/components' },
          { name: 'Typography' }
        ]"
      />
    </div>
    <div class="main-content-body">
      <p>HTML headings are titles or subtitles that you want to display on a webpage.</p>
      <component :is="ExampleBasic" />
      <component :is="ExampleBold" />
    </div>
  </div>
</template>
