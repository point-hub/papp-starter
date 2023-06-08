<script setup lang="ts">
import { BaseBreadcrumb } from '@/components/index'
import { BaseDivider } from '@/components/index'
</script>

<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h1>Forms</h1>
      <base-divider orientation="horizontal" />
      <component
        :is="BaseBreadcrumb"
        :breadcrumbs="[{ name: 'Template', path: '/template' }, { name: 'Forms' }]"
      />
    </div>
    <div class="main-content-body">
      <div class="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
        <router-link to="/template/forms/autocomplete" class="btn btn-xl btn-light-dark">
          Autocomplete
        </router-link>
        <router-link to="/template/forms/input-text" class="btn btn-xl btn-light-dark">
          Input Text
        </router-link>
        <router-link to="/template/forms/input-group" class="btn btn-xl btn-light-dark">
          Input Group
        </router-link>
        <router-link to="/template/forms/input-mask" class="btn btn-xl btn-light-dark">
          Input Mask
        </router-link>
        <router-link to="/template/forms/checkbox" class="btn btn-xl btn-light-dark">
          Checkbox
        </router-link>
        <router-link to="/template/forms/datepicker" class="btn btn-xl btn-light-dark">
          Datepicker
        </router-link>
        <router-link to="/template/forms/file-upload" class="btn btn-xl btn-light-dark">
          File Upload
        </router-link>
        <router-link to="/template/forms/radio" class="btn btn-xl btn-light-dark">
          Radio
        </router-link>
        <router-link to="/template/forms/radio-group" class="btn btn-xl btn-light-dark">
          Radio Group
        </router-link>
        <router-link to="/template/forms/switch" class="btn btn-xl btn-light-dark">
          Switch
        </router-link>
        <router-link to="/template/forms/select" class="btn btn-xl btn-light-dark">
          Select
        </router-link>
        <router-link to="/template/forms/range" class="btn btn-xl btn-light-dark">
          Range
        </router-link>
        <router-link to="/template/forms/textarea" class="btn btn-xl btn-light-dark">
          Textarea
        </router-link>
      </div>
    </div>
  </div>
</template>
