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
    <div>
      <p>
        The accordion component allows the user to show and hide sections of related content on a
        page.
      </p>
    </div>
    <div class="flex flex-col gap-4">
      <div class="table-container">
        <table class="table">
          <thead>
            <tr class="basic-table-row">
              <th class="basic-table-head">#</th>
              <th class="basic-table-head">Name</th>
              <th class="basic-table-head">Job</th>
              <th class="basic-table-head">Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            <tr class="basic-table-row">
              <td class="basic-table-body">1</td>
              <td class="basic-table-body">Cy Ganderton</td>
              <td class="basic-table-body">Quality Control Specialist</td>
              <td class="basic-table-body">Blue</td>
            </tr>
            <tr class="basic-table-row">
              <td class="basic-table-body">2</td>
              <td class="basic-table-body">Hart Hagerty</td>
              <td class="basic-table-body">Desktop Support Technician</td>
              <td class="basic-table-body">Purple</td>
            </tr>
            <tr class="basic-table-row">
              <td class="basic-table-body">3</td>
              <td class="basic-table-body">Brice Swyre</td>
              <td class="basic-table-body">Tax Accountant</td>
              <td class="basic-table-body">Red</td>
            </tr>
          </tbody>
        </table>
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
