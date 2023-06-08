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
        v-model="form.username"
        required
        label="Username"
        placeholder="John Doe"
        type="text"
        layout="horizontal"
        description="This is description for label"
      ></component>
      <component
        :is="BaseInput"
        layout="horizontal"
        v-model="form.email"
        label="Email"
        type="email"
        placeholder="johndoe@example.com"
        helper="this is helper message"
      ></component>
      <component
        :is="BaseInput"
        layout="horizontal"
        v-model="form.phone"
        label="Phone"
        type="tel"
      ></component>
      <component
        :is="BaseInput"
        layout="horizontal"
        v-model="form.number"
        label="Age"
        type="number"
      ></component>
      <component
        :is="BaseInput"
        layout="horizontal"
        v-model="form.password"
        label="Password"
        type="password"
        error="this is error message"
      ></component>
    </div>
    <button class="btn btn-primary">Submit</button>
  </form>
<template>`
