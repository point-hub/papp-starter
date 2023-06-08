<script setup lang="ts">
import { ref } from 'vue'
import { BaseSwitch } from '@/components/index'
import { codeExample } from './example-indicator'

const codeToggle = ref(false)
</script>

<template>
  <div class="card card-template">
    <div class="card-header">
      <h2>With Icon</h2>
      <component :is="BaseSwitch" v-model="codeToggle" label="code" />
    </div>
    <div class="flex flex-col gap-5">
      <!-- primary -->
      <div class="alert alert-outline-primary">
        <div class="flex">
          <div class="indicator-primary"></div>
          <div class="alert-text">
            <p>Lorem Ipsum is simply dummy text Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <button type="button" class="close-button">
          <i class="i-fas-xmark block"></i>
        </button>
      </div>
      <!-- secondary -->
      <div class="alert alert-outline-secondary">
        <div class="flex">
          <div class="rounded-l bg-secondary p-2"></div>
          <div class="alert-text">
            <p>Lorem Ipsum is simply dummy text Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <button type="button" class="close-button">
          <i class="i-fas-xmark block"></i>
        </button>
      </div>
      <!-- info -->
      <div class="alert alert-outline-info">
        <div class="flex">
          <div class="rounded-l bg-info p-2"></div>
          <div class="alert-text">
            <p>Lorem Ipsum is simply dummy text Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <button type="button" class="close-button">
          <i class="i-fas-xmark block"></i>
        </button>
      </div>
      <!-- success -->
      <div class="alert alert-outline-success">
        <div class="flex">
          <div class="rounded-l bg-success p-2"></div>
          <div class="alert-text">
            <p>Lorem Ipsum is simply dummy text Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <button type="button" class="close-button">
          <i class="i-fas-xmark block"></i>
        </button>
      </div>
      <!-- warning -->
      <div class="alert alert-outline-warning">
        <div class="flex">
          <div class="rounded-l bg-warning p-2"></div>
          <div class="alert-text">
            <p>Lorem Ipsum is simply dummy text Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <button type="button" class="close-button">
          <i class="i-fas-xmark block"></i>
        </button>
      </div>
      <!-- danger -->
      <div class="alert alert-outline-danger">
        <div class="flex">
          <div class="rounded-l bg-danger p-2"></div>
          <div class="alert-text">
            <p>Lorem Ipsum is simply dummy text Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <button type="button" class="close-button">
          <i class="i-fas-xmark block"></i>
        </button>
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
