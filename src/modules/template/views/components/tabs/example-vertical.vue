<script setup lang="ts">
import { ref } from 'vue'
import { BaseSwitch } from '@/components/index'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import { codeExample } from './example-vertical'

const codeToggle = ref(false)
</script>

<template>
  <div class="card card-template">
    <div class="card-header">
      <h2>Vertical</h2>
      <component :is="BaseSwitch" v-model="codeToggle" label="code" />
    </div>
    <div class="flex flex-col gap-4">
      <TabGroup as="div" class="flex flex-row gap-8">
        <TabList class="mb-5 sm:mb-0 sm:flex-[0_0_20%] space-y-2 ltr:pr-4 rtl:pl-4">
          <Tab as="template" v-slot="{ selected }">
            <a
              href="javascript:void(0);"
              class="block rounded-md px-4 py-2 transition-all duration-300 !outline-none"
              :class="{ '!bg-primary text-white': selected }"
            >
              Home
            </a>
          </Tab>
          <Tab as="template" v-slot="{ selected }">
            <a
              href="javascript:void(0);"
              class="block rounded-md px-4 py-2 transition-all duration-300 !outline-none"
              :class="{ '!bg-primary text-white': selected }"
            >
              Profile
            </a>
          </Tab>
          <Tab as="template" v-slot="{ selected }">
            <a
              href="javascript:void(0);"
              class="block rounded-md px-4 py-2 transition-all duration-300 !outline-none"
              :class="{ '!bg-primary text-white': selected }"
            >
              Contact
            </a>
          </Tab>
        </TabList>
        <TabPanels class="flex-1 text-sm">
          <TabPanel>
            <h4 class="text-2xl font-semibold">Home</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </TabPanel>
          <TabPanel>
            <h4 class="text-2xl font-semibold">Profile</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </TabPanel>
          <TabPanel>
            <h4 class="text-2xl font-semibold">Contact</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </TabPanel>
        </TabPanels>
      </TabGroup>
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
