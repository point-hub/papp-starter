<script setup lang="ts">
import { ref } from 'vue'
import { BaseSwitch } from '@/components/index'
import { BaseRadioGroup } from '@/components/index'
import { codeExample } from './example-basic'

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
const codeToggle = ref(false)
</script>

<template>
  <div class="card card-template">
    <div class="card-header">
      <h2>Example</h2>
      <component :is="BaseSwitch" v-model="codeToggle" label="code" />
    </div>
    <div class="flex flex-col gap-4">
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
                <div class="w-full flex items-center justify-between space-x-4">
                  <div class="flex flex-col">
                    <div class="text-base font-semibold">{{ option.name }}</div>
                    <div class="text-sm font-light">
                      {{ option.cpus }} - {{ option.ram }} - {{ option.disk }}
                    </div>
                  </div>
                  <div v-show="checked" class="shrink-0 text-white">
                    <i class="i-fas-circle-check block"></i>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </component>
        <button class="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
    <div
      class="card-code"
      :class="{
        'card-code-active': codeToggle,
        'card-code-inactive': !codeToggle
      }"
    >
      <div class="card-code-label">vue</div>
      <highlightjs autodetect :code="codeExample" />
    </div>
  </div>
</template>
