<script setup lang="ts">
import AppBreadcrumb from '@/components/app-breadcrumb.vue'

interface IProps {
  breadcrumbs: { name: string; path?: string }[]
  menus: { name: string; icon: string; path: string }[]
}

const props = defineProps<IProps>()
</script>

<template>
  <div class="flex flex-col gap-4">
    <app-breadcrumb :breadcrumbs="breadcrumbs" />

    <div class="grid cols-1 sm:cols-2 lg:cols-3 xl:cols-4 gap-4">
      <base-button size="none" v-for="menu in props.menus" :key="menu" class="w-full h-full">
        <router-link :to="menu.path" class="w-full h-full">
          <base-card class="p-4! h-full">
            <div class="flex flex-col gap-4">
              <base-icon :icon="menu.icon" class="h-12 w-12 w-full" />
              <div class="flex flex-col">
                <p class="line-clamp-2">{{ menu.name }}</p>
              </div>
            </div>
          </base-card>
        </router-link>
      </base-button>
    </div>
  </div>
</template>

<style scoped lang="postcss"></style>
