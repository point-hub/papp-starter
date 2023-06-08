<script setup lang="ts">
import { BaseBreadcrumb } from '@/components/index'
import { BaseDivider } from '@/components/index'
import ExampleBasic from './example-basic.vue'
</script>

<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h1>Accordion</h1>
      <base-divider orientation="horizontal" />
      <component
        :is="BaseBreadcrumb"
        :breadcrumbs="[
          { name: 'Template', path: '/template' },
          { name: 'Components', path: '/template/components' },
          { name: 'Accordion' }
        ]"
      />
    </div>
    <div class="main-content-body">
      <p>
        Use the accordion component to show hidden information based on the collapse and expand
        state of the child elements using data attribute options
      </p>
      <component :is="ExampleBasic" />
      <!-- API -->
      <div class="card card-template">
        <h2>Component API</h2>
        <h3 class="font-bold">BaseAccordion</h3>
        <p>The Base Accordion component</p>
        <div class="table-container">
          <table class="table">
            <thead>
              <tr class="basic-table-row">
                <th class="basic-table-head">Name</th>
                <th class="basic-table-head">Type</th>
                <th class="basic-table-head expand">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr class="basic-table-row">
                <td class="basic-table-body">alwaysOpen</td>
                <td class="basic-table-body">boolean</td>
                <td class="basic-table-body space-y-2">
                  <p>
                    <span class="highlight">required</span>, default:
                    <span class="highlight">false</span>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3 class="font-bold">BaseAccordionItem</h3>
        <p>The Base Accordion Item component</p>
        <div class="table-container">
          <table class="table">
            <thead>
              <tr class="basic-table-row">
                <th class="basic-table-head">Name</th>
                <th class="basic-table-head">Type</th>
                <th class="basic-table-head expand">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr class="basic-table-row">
                <td class="basic-table-body">item-id</td>
                <td class="basic-table-body">number</td>
                <td class="basic-table-body">
                  <span class="highlight">unique</span>
                  <p>To identify triggered item</p>
                </td>
              </tr>
              <tr class="basic-table-row">
                <td class="basic-table-body">title</td>
                <td class="basic-table-body">string</td>
                <td class="basic-table-body">The title</td>
              </tr>
              <tr class="basic-table-row">
                <td class="basic-table-body">content</td>
                <td class="basic-table-body">string</td>
                <td class="basic-table-body">The content</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
