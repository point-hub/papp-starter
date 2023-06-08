<script setup lang="ts">
import { BaseBreadcrumb } from '@/components/index'
import { BaseDivider } from '@/components/index'
</script>

<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h1>Template</h1>
      <base-divider orientation="horizontal" />
      <component :is="BaseBreadcrumb" :breadcrumbs="[{ name: 'Template' }]" />
    </div>
    <div class="main-content-body">
      <div class="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
        <router-link to="/template/components" class="btn btn-xl btn-light-dark">
          Components
        </router-link>
        <router-link to="/template/forms" class="btn btn-xl btn-light-dark">Forms</router-link>
        <router-link to="/template/pages" class="btn btn-xl btn-light-dark">Pages</router-link>
      </div>
    </div>
  </div>
</template>
