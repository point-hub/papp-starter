<script setup lang="ts">
import { BaseBreadcrumb } from '@/components/index'
import { BaseDivider } from '@/components/index'
</script>

<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h1>Pages</h1>
      <base-divider orientation="horizontal" />
      <component
        :is="BaseBreadcrumb"
        :breadcrumbs="[{ name: 'Template', path: '/template' }, { name: 'pages' }]"
      />
    </div>
    <div class="main-content-body">
      <div class="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
        <router-link to="/template/pages/signup" class="btn btn-xl btn-light-dark">
          Signup
        </router-link>
      </div>
    </div>
  </div>
</template>
