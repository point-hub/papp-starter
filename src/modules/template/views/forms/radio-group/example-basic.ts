export const codeExample = `<script setup lang="ts">
import { ref } from 'vue'
import { BaseRadioGroup } from '@/components/index'

const options = [
  {
    name: 'Startup',
    ram: '12GB',
    cpus: '6 CPUs',
    disk: '160 GB SSD disk'
  },
  {
    name: 'Business',
    ram: '16GB',
    cpus: '8 CPUs',
    disk: '512 GB SSD disk'
  },
  {
    name: 'Enterprise',
    ram: '32GB',
    cpus: '12 CPUs',
    disk: '1024 GB SSD disk'
  }
]

const value = ref()
</script>

<template>
  <div>Selected : {{ value }}</div>
  <form @submit.prevent="" class="space-y-4">
    <component :is="BaseRadioGroup" v-model="value" :options="options">
      <template v-slot="{ checked, option }">
        <div class="w-full cursor-pointer">
          <div
            :class="[
              checked
                ? 'bg-blue-700 border-blue-700 text-white '
                : 'bg-white dark:bg-slate-700 dark:text-white text-slate-900 dark:border-slate-600'
            ]"
            class="border rounded p-4"
          >
            <div class="w-full flex space-x-4 items-center justify-between">
              <div class="flex flex-col">
                <div class="text-base font-semibold">{{ option.name }}</div>
                <div class="text-sm font-light">
                  {{ option.cpus }} - {{ option.ram }} - {{ option.disk }}
                </div>
              </div>
              <div v-show="checked" class="shrink-0 text-white">
                <i class="block i-fas-circle-check"></i>
              </div>
            </div>
          </div>
        </div>
      </template>
    </component>
    <button class="btn btn-primary" type="submit">Submit</button>
  </form>
<template>`
