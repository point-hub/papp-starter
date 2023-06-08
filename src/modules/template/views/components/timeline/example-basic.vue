<script setup lang="ts">
import { ref } from 'vue'
import { BaseSwitch } from '@/components/index'
import { codeExample } from './example-basic'

const codeToggle = ref(false)
</script>

<template>
  <div class="card card-template">
    <div class="card-header">
      <h2>Example</h2>
      <component :is="BaseSwitch" v-model="codeToggle" label="code" />
    </div>
    <div class="flex flex-col">
      <div class="timeline-root">
        <div class="timeline-body">
          <div class="timeline-point">
            <img
              src="https://via.placeholder.com/150"
              alt=""
              class="mx-auto h-12 w-12 rounded-full"
            />
          </div>
          <div class="timeline-content">
            <div>
              <h4 class="text-base font-bold">John Doe</h4>
              <p class="text-sm font-light">5 sec</p>
            </div>
            <div class="flex items-center gap-2">
              <i class="i-far-file-lines block h-6 w-6"></i>
              <p class="inline-block text-lg">
                <span class="font-bold">APPROVE</span> INVOICE0000001
              </p>
            </div>
            <p class="font-light -mt-2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
        <div class="timeline-body">
          <div class="timeline-point">
            <img
              src="https://via.placeholder.com/150"
              alt=""
              class="mx-auto h-12 w-12 rounded-full"
            />
          </div>
          <div class="timeline-content">
            <div>
              <h4 class="text-base font-bold">Charles</h4>
              <p class="text-sm font-light">20 sec</p>
            </div>
            <div class="flex items-center gap-2">
              <i class="i-far-file-lines block h-6 w-6"></i>
              <p class="inline-block text-lg">
                <span class="font-bold">CREATE</span> INVOICE0000001
              </p>
            </div>
            <p class="font-light -mt-2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </div>
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
