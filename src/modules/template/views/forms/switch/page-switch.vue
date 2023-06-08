<script setup lang="ts">
import { BaseBreadcrumb } from '@/components/index'
import { BaseDivider } from '@/components/index'
import ExampleBasic from './example-basic.vue'
import ExampleLabel from './example-label.vue'
import ExampleSize from './example-size.vue'
import ExampleDisabled from './example-disabled.vue'
</script>

<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h1>Switch</h1>
      <base-divider orientation="horizontal" />
      <component
        :is="BaseBreadcrumb"
        :breadcrumbs="[
          { name: 'Template', path: '/template' },
          { name: 'Forms', path: '/template/forms' },
          { name: 'Switch' }
        ]"
      />
    </div>
    <div class="main-content-body">
      <p>
        The Switch component is used as an alternative for the checkbox. The option that the switch
        controls, as well as the state it's in, should be made clear from the corresponding inline
        label.
      </p>
      <component :is="ExampleBasic" />
      <component :is="ExampleLabel" />
      <component :is="ExampleSize" />
      <component :is="ExampleDisabled" />
    </div>
  </div>
</template>
