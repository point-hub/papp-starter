<script setup lang="ts">
export interface IBreadcrumb {
  name: string
  path?: string
  dataTestid?: string
}

export interface IProps {
  breadcrumbs: IBreadcrumb[]
}

const props = defineProps<IProps>();
</script>

<template>
  <base-card>
    <base-breadcrumb :items="props.breadcrumbs" separator="angle" v-slot="{ item }">
      <router-link v-if="item.path" :to="item.path" :data-testid="item.dataTestid" class="flex items-center">
        <base-icon v-if="item.path === '/'" icon="i-fa7-solid-house" />
        <span v-else>{{ item.name }}</span>
      </router-link>
      <div class="flex items-center" v-else>
        {{ item.name }}
      </div>
    </base-breadcrumb>
  </base-card>
</template>

<style scoped lang="postcss"></style>
