<script setup lang="ts">
const props = defineProps<{
  email: string
}>();
</script>

<template>
  <base-card class="max-w-xl">
    <div class="flex flex-col gap-6">
      <div>
        <base-icon icon="i-fal-envelope-circle-check" class="text-[48px] mb-2"/>
        <h1 class="text-2xl">Please verify your email</h1>
      </div>

      <div>
        <p>You're almost there! We sent an email to</p>
        <p class="font-semibold">{{ props.email }}</p>
      </div>

      <div class="text-sm font-light">
        <p>Just click on the link in that email to complete your signup.</p>
        <p>
          If you don't see it, you may wait a few minutes for the email to arrive or check your spam
          folder.
        </p>
      </div>

      <router-link to="/signin">
        <base-button color="primary" class="w-full">SIGNIN</base-button>
      </router-link>
    </div>
  </base-card>
</template>
