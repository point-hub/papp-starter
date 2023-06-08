<script setup lang="ts">
import { BaseBreadcrumb } from '@/components/index'
import { BaseDivider } from '@/components/index'
</script>

<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h1>Components</h1>
      <base-divider orientation="horizontal" />
      <component
        :is="BaseBreadcrumb"
        :breadcrumbs="[{ name: 'Template', path: '/template' }, { name: 'Components' }]"
      />
    </div>
    <div class="main-content-body">
      <div class="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
        <router-link to="/template/components/accordion" class="btn btn-xl btn-light-dark">
          Accordion
        </router-link>
        <router-link to="/template/components/alert" class="btn btn-xl btn-light-dark">
          Alert
        </router-link>
        <router-link to="/template/components/avatar" class="btn btn-xl btn-light-dark">
          Avatar
        </router-link>
        <router-link to="/template/components/badge" class="btn btn-xl btn-light-dark">
          Badge
        </router-link>
        <router-link to="/template/components/breadcrumb" class="btn btn-xl btn-light-dark">
          Breadcrumb
        </router-link>
        <router-link to="/template/components/button" class="btn btn-xl btn-light-dark">
          Button
        </router-link>
        <router-link to="/template/components/button-group" class="btn btn-xl btn-light-dark">
          Button Group
        </router-link>
        <router-link to="/template/components/card" class="btn btn-xl btn-light-dark">
          Card
        </router-link>
        <router-link to="/template/components/collapse" class="btn btn-xl btn-light-dark">
          Collapse
        </router-link>
        <router-link to="/template/components/divider" class="btn btn-xl btn-light-dark">
          Divider
        </router-link>
        <router-link to="/template/components/dropdown" class="btn btn-xl btn-light-dark">
          Dropdown
        </router-link>
        <router-link to="/template/components/mask" class="btn btn-xl btn-light-dark">
          Mask
        </router-link>
        <router-link to="/template/components/modal" class="btn btn-xl btn-light-dark">
          Modal
        </router-link>
        <router-link to="/template/components/notification" class="btn btn-xl btn-light-dark">
          Notification
        </router-link>
        <router-link to="/template/components/popover" class="btn btn-xl btn-light-dark">
          Popover
        </router-link>
        <router-link to="/template/components/progress" class="btn btn-xl btn-light-dark">
          Progress
        </router-link>
        <router-link to="/template/components/skeleton" class="btn btn-xl btn-light-dark">
          Skeleton
        </router-link>
        <router-link to="/template/components/spinner" class="btn btn-xl btn-light-dark">
          Spinner
        </router-link>
        <router-link to="/template/components/steps" class="btn btn-xl btn-light-dark">
          Steps
        </router-link>
        <router-link to="/template/components/table" class="btn btn-xl btn-light-dark">
          Table
        </router-link>
        <router-link to="/template/components/tabs" class="btn btn-xl btn-light-dark">
          Tabs
        </router-link>
        <router-link to="/template/components/timeline" class="btn btn-xl btn-light-dark">
          Timeline
        </router-link>
        <router-link to="/template/components/tooltip" class="btn btn-xl btn-light-dark">
          Tooltip
        </router-link>
        <router-link to="/template/components/treeview" class="btn btn-xl btn-light-dark">
          Treeview
        </router-link>
        <router-link to="/template/components/typography" class="btn btn-xl btn-light-dark">
          Typography
        </router-link>
      </div>
    </div>
  </div>
</template>
