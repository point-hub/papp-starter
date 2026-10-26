<script setup lang="ts">
import LayoutsWithHeader from '@/components/bottom-bar-layouts/with-header.vue';
</script>

<template>
  <layouts-with-header page-title="Page Title" sidebar-title="Sidebar Title" :has-aside="false">
    <template #sidebar>
      <div class="p-4">
        Sidebar Content
      </div>
    </template>

    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas commodi iure odit numquam doloribus, nulla eum repellendus minus consectetur delectus maxime, provident eveniet quasi quo earum, ut maiores. Consectetur, illum.

  </layouts-with-header>
</template>
