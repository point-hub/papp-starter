<script setup lang="ts">
import AppBreadcrumb, { type IBreadcrumb } from '@/components/app-breadcrumb.vue';

export interface IMenu {
  name: string
  icon: string
  path: string
  dataTestid?: string
}

interface IProps {
  breadcrumbs: IBreadcrumb[]
  menus: IMenu[]
}

const props = defineProps<IProps>();
</script>

<template>
  <div class="flex flex-col gap-4">
    <app-breadcrumb :breadcrumbs="breadcrumbs" />

    <div class="grid cols-2 sm:cols-3 lg:cols-4 xl:cols-5 2xl:cols-6 gap-4">
      <base-button size="none" v-for="menu in props.menus" :key="menu" class="w-full h-full">
        <router-link :to="menu.path" class="w-full h-full" :data-testid="menu.dataTestid">
          <base-card>
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
