<script setup lang="ts">
import { useDarkMode } from '@/composable/dark-mode'
import { useScreenSize } from '@/composable/screen-size'
import { BaseNotification } from '@/components/index'

useDarkMode()
useScreenSize()
</script>

<template>
  <router-view />
  <component :is="BaseNotification" />
</template>
