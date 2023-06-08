<script setup lang="ts">
import { BaseBreadcrumb } from '@/components/index'
import { BaseDivider } from '@/components/index'
import ExampleBasic from './example-basic.vue'
import ExampleDropzone from './example-dropzone.vue'
</script>

<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h1>File Upload</h1>
      <base-divider orientation="horizontal" />
      <component
        :is="BaseBreadcrumb"
        :breadcrumbs="[
          { name: 'Template', path: '/template' },
          { name: 'Forms', path: '/template/forms' },
          { name: 'File Upload' }
        ]"
      />
    </div>
    <div class="main-content-body">
      <p>
        Input elements with type "file" let the user choose one or more files from their device
        storage. Once chosen, the files can be uploaded to a server using form submission.
      </p>
      <component :is="ExampleBasic" />
      <component :is="ExampleDropzone" />
    </div>
  </div>
</template>
