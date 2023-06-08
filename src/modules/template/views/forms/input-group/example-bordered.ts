export const codeExample = `<script setup lang="ts">
import { ref } from 'vue'
import { BaseInput } from '@/components/index'

const form = ref({
  email: '',
  phone: '',
  number: '',
  username: '',
  password: ''
})
</script>

<template>
  <form action="" method="post" class="space-y-5">
    <div class="space-y-2">
      <component
        :is="BaseInput"
        border="full"
        required
        v-model="form.username"
        label="Username"
        placeholder="John Doe"
      >
        <template #prefix> <i class="i-far-user block mx-3"></i> </template>
      </component>
      <component
        :is="BaseInput"
        border="full"
        v-model="form.email"
        label="Email"
        type="email"
        placeholder="johndoe@example.com"
      >
        <template #prefix>
          <i class="i-far-envelope block mx-3"></i>
        </template>
      </component>
      <component :is="BaseInput" border="full" v-model="form.phone" label="Phone" type="tel">
        <template #prefix>
          <div class="mx-3">+62</div>
        </template>
      </component>
      <component
        :is="BaseInput"
        border="full"
        v-model="form.number"
        label="Age"
        type="number"
        helper="this is helper message"
      >
        <template #suffix>
          <div class="mx-3">Years old</div>
        </template>
      </component>
      <component
        :is="BaseInput"
        border="full"
        v-model="form.password"
        label="Password"
        type="password"
        error="this is error message"
      >
        <template #suffix>
          <i class="block i-far-eye mx-3"></i>
            </template>
          </component>
        </div>
        <button class="btn btn-primary">Submit</button>
      </form>
<template>`
