<script setup lang="ts">
import { ref } from 'vue'
import { BaseInput } from '@/components/index'

const form = ref({
  email: '',
  username: '',
  password: ''
})
</script>

<template>
  <div class="mx-auto max-w-xl w-full p-4 sm:px-5">
    <div class="text-center">
      <div class="mt-4">
        <h2 class="text-2xl font-semibold text-slate-600 dark:text-slate-100">
          Welcome To Pointhub
        </h2>
        <p class="text-slate-400 dark:text-slate-300">Please sign up to continue</p>
      </div>
    </div>
    <div class="card mt-5 rounded-lg p-5 lg:p-7">
      <form action="" method="post" class="space-y-5">
        <div class="space-y-2">
          <component
            :is="BaseInput"
            required
            border="full"
            v-model="form.username"
            label="Username"
            placeholder="John Doe"
          >
            <template #prefix>
              <i class="i-far-user mx-3 block"></i>
            </template>
          </component>
          <component
            :is="BaseInput"
            required
            border="full"
            v-model="form.email"
            label="Email"
            type="email"
            placeholder="johndoe@example.com"
            helper="this is helper message"
          >
            <template #prefix>
              <i class="i-far-envelope mx-3 block"></i>
            </template>
          </component>
          <component
            :is="BaseInput"
            required
            border="full"
            v-model="form.password"
            label="Password"
            type="password"
            error="this is error message"
          >
            <template #suffix>
              <i class="i-far-eye mx-3 block"></i>
            </template>
          </component>
        </div>

        <div class="mt-4 flex items-center space-x-2">
          <input
            class="form-checkbox is-basic h-5 w-5 border-slate-400/70 rounded checked:border-blue-700 dark:border-slate-400 focus:border-blue-700 hover:border-blue-700 checked:bg-blue-700 dark:checked:border-info dark:focus:border-info dark:hover:border-info dark:checked:bg-info"
            type="checkbox"
          />
          <p class="line-clamp-1">
            I agree with
            <a href="#" class="text-slate-400 dark:text-slate-300 hover:underline">
              privacy policy
            </a>
          </p>
        </div>
        <button class="btn btn-primary btn-block">Submit</button>
      </form>
      <div class="text-xs+ mt-4 text-center">
        <p class="line-clamp-1">
          <span>Already have an account? </span>
          <a
            class="text-blue-500 transition-colors dark:text-slate hover:text-blue-600 dark:hover:text-info"
            href="#"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  </div>
</template>
