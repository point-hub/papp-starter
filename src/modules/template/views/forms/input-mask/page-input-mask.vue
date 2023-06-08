<script setup lang="ts">
import { BaseBreadcrumb } from '@/components/index'
import { BaseDivider } from '@/components/index'
import ExampleCreditCard from './example-credit-card.vue'
import ExampleNumeral from './example-numeral.vue'
import ExampleDate from './example-date.vue'
</script>

<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h1>Input Mask</h1>
      <base-divider orientation="horizontal" />
      <component
        :is="BaseBreadcrumb"
        :breadcrumbs="[
          { name: 'Template', path: '/template' },
          { name: 'Forms', path: '/template/forms' },
          { name: 'Input Mask' }
        ]"
      />
    </div>
    <div class="main-content-body">
      <p>
        To provide an easy way to increase input field readability by formatting your typed data.
      </p>
      <component :is="ExampleCreditCard" />
      <component :is="ExampleNumeral" />
      <component :is="ExampleDate" />
    </div>
  </div>
</template>
