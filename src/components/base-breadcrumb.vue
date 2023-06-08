<script lang="ts">
export interface Breadcrumb {
  name: string
  path?: string
}
</script>

<script setup lang="ts">
const props = defineProps<{
  breadcrumbs: Breadcrumb[]
}>()
</script>

<template>
  <ul class="scrollbar-hidden flex items-center gap-2 overflow-x-auto text-sm text-slate-500">
    <li
      v-for="(breadcrumb, index) in props.breadcrumbs"
      :key="index"
      class="flex items-center justify-center gap-2"
    >
      <router-link
        v-if="breadcrumb.path"
        :class="{ 'text-blue-500': breadcrumb.path }"
        :to="breadcrumb.path"
      >
        {{ breadcrumb.name }}
      </router-link>
      <span v-else>{{ breadcrumb.name }}</span>
      <i
        v-if="index + 1 < props.breadcrumbs.length"
        class="i-fas-angle-right block bg-slate-300 dark:bg-slate-600"
      ></i>
    </li>
  </ul>
</template>
