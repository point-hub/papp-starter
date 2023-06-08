<script setup lang="ts">
import { ref } from 'vue'
import { BaseSwitch } from '@/components/index'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import { codeExample } from './example-basic'

const codeToggle = ref(false)
</script>

<template>
  <div class="card card-template">
    <div class="card-header">
      <h2>Horizontal</h2>
      <component :is="BaseSwitch" v-model="codeToggle" label="code" />
    </div>
    <div class="flex flex-col gap-4">
      <TabGroup as="div" class="mb-5">
        <TabList class="mb-5 mt-3 flex flex-wrap border-b border-slate-200 dark:border-[#191e3a]">
          <Tab as="template" v-slot="{ selected }">
            <a
              href="javascript:void(0);"
              class="flex items-center gap-2 px-4 pb-2 -mb-[1px] !outline-none"
              :class="{ 'border-b-2 !border-slate-500': selected }"
            >
              <i class="i-far-house"></i>
              Home
            </a>
          </Tab>
          <Tab as="template" v-slot="{ selected }">
            <a
              href="javascript:void(0);"
              class="flex items-center gap-2 px-4 pb-2 -mb-[1px] !outline-none"
              :class="{ 'border-b-2 !border-slate-500': selected }"
            >
              <i class="i-far-circle-user"></i>
              Profile
            </a>
          </Tab>
          <Tab as="template" v-slot="{ selected }">
            <a
              href="javascript:void(0);"
              class="flex items-center gap-2 px-4 pb-2 -mb-[1px] !outline-none"
              :class="{ 'border-b-2 !border-slate-500': selected }"
            >
              <i class="i-far-phone"></i>
              Contact
            </a>
          </Tab>
        </TabList>
        <TabPanels class="flex-1 text-sm">
          <TabPanel>
            <h4 class="mb-4 text-2xl font-semibold">Home</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </TabPanel>
          <TabPanel>
            <h4 class="mb-4 text-2xl font-semibold">Profile</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </TabPanel>
          <TabPanel>
            <h4 class="mb-4 text-2xl font-semibold">Contact</h4>
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
