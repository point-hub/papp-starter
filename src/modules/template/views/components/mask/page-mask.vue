<script setup lang="ts">
import { BaseBreadcrumb } from '@/components/index'
import { BaseDivider } from '@/components/index'
import ExampleSquircle from './example-squircle.vue'
import ExampleDiamond from './example-diamond.vue'
import ExampleReuleauxTriangle from './example-reuleaux-triangle.vue'
import ExampleHexagon from './example-hexagon.vue'
import ExampleOctagon from './example-octagon.vue'
import ExampleHeart from './example-heart.vue'
import ExampleStar from './example-star.vue'
</script>

<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h1>Mask</h1>
      <base-divider orientation="horizontal" />
      <component
        :is="BaseBreadcrumb"
        :breadcrumbs="[
          { name: 'Template', path: '/template' },
          { name: 'Components', path: '/template/components' },
          { name: 'Mask' }
        ]"
      />
    </div>
    <div class="main-content-body">
      <p>Mask crops the content of the element to common shapes.</p>
      <component :is="ExampleSquircle" />
      <component :is="ExampleDiamond" />
      <component :is="ExampleReuleauxTriangle" />
      <component :is="ExampleHexagon" />
      <component :is="ExampleOctagon" />
      <component :is="ExampleHeart" />
      <component :is="ExampleStar" />
    </div>
  </div>
</template>
