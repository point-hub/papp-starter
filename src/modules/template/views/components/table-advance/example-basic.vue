<script setup lang="ts">
import { ref } from 'vue'
import { BaseCheckbox } from '@/components/index'
import { BaseAutocomplete } from '@/components/index'
import { BaseDropdown } from '@/components/index'
import { BaseInput } from '@/components/index'
import { BaseSwitch } from '@/components/index'
import { codeExample } from './example-basic'

const list = [
  { id: 1, label: 'Quality Control Specialist' },
  { id: 2, label: 'Desktop Support Technician' },
  { id: 3, label: 'Tax Accountant' }
]

const selected = ref({})

const checkbox: boolean[] = []
const searchAll = ref('')
const search: string[] = []
const codeToggle = ref(false)

const columns = ref([
  {
    name: 'Checkbox',
    isShow: true,
    isEditable: true
  },
  {
    name: 'Name',
    isShow: true,
    isEditable: false
  },
  {
    name: 'Job',
    isShow: true,
    isEditable: true
  },
  {
    name: 'Favorite Color',
    isShow: true,
    isEditable: true
  }
])
</script>

<template>
  <div class="card card-template">
    <div class="card-header">
      <h2>Example</h2>
      <component :is="BaseSwitch" v-model="codeToggle" label="code" />
    </div>
    <div>
      <p>Table component with checkbox, pagination, search, sort, column chooser</p>
    </div>
    <div class="flex flex-col gap-4">
      <div class="flex self-end">
        <component :is="BaseDropdown" position="right">
          <template #trigger>
            <div class="btn btn-outline-primary space-x-4">
              <span>Column</span>
              <i class="i-far-angle-down block"></i>
            </div>
          </template>
          <div class="p-1">
            <div class="flex flex-col gap-4 p-2">
              <component
                v-for="(column, index) in columns"
                :key="index"
                :is="BaseCheckbox"
                :disabled="!column.isEditable"
                v-model="column.isShow"
                theme="primary"
                :label="column.name"
              />
            </div>
          </div>
        </component>
      </div>
      <div class="w-full flex items-center gap-4">
        <div class="w-full flex space-x-2">
          <button class="btn btn-primary rounded-none space-x-1">
            <i class="i-far-pen-to-square block"></i>
            <span>Add New</span>
          </button>
          <component
            :is="BaseInput"
            v-model="searchAll"
            placeholder="Search"
            border="full"
            class="flex-1"
          >
            <template #prefix>
              <i class="i-far-magnifying-glass mx-3 block"></i>
            </template>
          </component>

          <button class="btn btn-secondary rounded-none" v-tippy="'Table Setting'">
            <i class="i-far-gear block"></i>
          </button>
        </div>
      </div>
      <div class="table-container">
        <table class="table">
          <thead>
            <tr class="basic-table-row bg-slate-100 dark:bg-slate-700">
              <th class="basic-table-head text-center" v-if="columns[0].isShow">
                <component :is="BaseCheckbox" v-model="checkbox[0]" theme="info" />
              </th>
              <th class="basic-table-head" v-if="columns[1].isShow">
                <div class="flex items-center justify-between">
                  <p>{{ columns[1].name }}</p>
                  <button>
                    <i class="i-far-arrow-up-z-a block"></i>
                  </button>
                </div>
              </th>
              <th class="basic-table-head" v-if="columns[2].isShow">
                <div class="flex items-center justify-between">
                  <p>{{ columns[2].name }}</p>
                  <button>
                    <i class="i-far-arrow-down-a-z block"></i>
                  </button>
                </div>
              </th>
              <th class="basic-table-head" v-if="columns[3].isShow">
                <div class="flex items-center justify-between">
                  <p>{{ columns[3].name }}</p>
                  <button>
                    <i class="i-far-arrow-up-arrow-down block"></i>
                  </button>
                </div>
              </th>
            </tr>
            <tr class="basic-table-row bg-slate-100 dark:bg-slate-700">
              <th v-if="columns[0].isShow"></th>
              <th v-if="columns[1].isShow" class="basic-table-head">
                <component
                  :is="BaseInput"
                  required
                  v-model="search[0]"
                  placeholder="Search"
                  border="none"
                  class="font-normal text-slate-800 dark:text-slate-400"
                ></component>
              </th>
              <th v-if="columns[2].isShow" class="basic-table-head">
                <component
                  class="font-normal"
                  :is="BaseAutocomplete"
                  v-model="selected"
                  :list="list"
                  placeholder="Search"
                  border="none"
                ></component>
              </th>
              <th v-if="columns[3].isShow" class="basic-table-head">
                <component
                  :is="BaseInput"
                  required
                  v-model="search[0]"
                  placeholder="Search"
                  border="none"
                  class="font-light text-slate-800 dark:text-slate-400"
                ></component>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="basic-table-row">
              <td v-if="columns[0].isShow" class="basic-table-body text-center">
                <component :is="BaseCheckbox" v-model="checkbox[0]" theme="info" />
              </td>
              <td v-if="columns[1].isShow" class="basic-table-body">Cy Ganderton lorem</td>
              <td v-if="columns[2].isShow" class="basic-table-body">Quality Control Specialist</td>
              <td v-if="columns[3].isShow" class="basic-table-body">Blue</td>
            </tr>
            <tr class="basic-table-row">
              <td v-if="columns[0].isShow" class="basic-table-body text-center">
                <component :is="BaseCheckbox" v-model="checkbox[1]" theme="info" />
              </td>
              <td v-if="columns[1].isShow" class="basic-table-body">Hart Hagerty</td>
              <td v-if="columns[2].isShow" class="basic-table-body">Desktop Support Technician</td>
              <td v-if="columns[3].isShow" class="basic-table-body">Purple</td>
            </tr>
            <tr class="basic-table-row">
              <td v-if="columns[0].isShow" class="basic-table-body text-center">
                <component :is="BaseCheckbox" v-model="checkbox[2]" theme="info" />
              </td>
              <td v-if="columns[1].isShow" class="basic-table-body">Brice Swyre</td>
              <td v-if="columns[2].isShow" class="basic-table-body">Tax Accountant</td>
              <td v-if="columns[3].isShow" class="basic-table-body">Red</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="w-full flex items-center justify-between">
        <div>
          <p class="text-sm text-slate-600 dark:text-slate-400">Showing 1 to 10 of 23 entries</p>
        </div>
        <div class="btn-group">
          <button type="button" class="btn btn-light-dark rounded-r-none">
            <i class="i-fas-angle-left block"></i>
          </button>
          <button type="button" class="btn btn-primary rounded border-r-none">1</button>
          <button type="button" class="btn btn-light-dark rounded-none border-r-none">2</button>
          <button type="button" class="btn btn-light-dark rounded-none border-r-none">3</button>
          <button type="button" class="btn btn-light-dark rounded-none border-r-none">4</button>
          <button type="button" class="btn btn-light-dark rounded-none border-r-none">5</button>
          <button type="button" class="btn btn-light-dark rounded-l-none">
            <i class="i-fas-angle-right block"></i>
          </button>
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
