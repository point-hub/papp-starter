<script setup lang="ts"></script>

<template>
  <base-card class="max-w-xl">
    <div class="flex flex-col gap-6">
      <div>
        <base-icon icon="i-fal-envelope-circle-check" class="text-[48px] mb-2" />
        <h1 class="text-2xl">Your Email Has Been Verified!</h1>
      </div>
      <div class="flex flex-col gap-4">
        <p>
          Thank you for verifying your email address. Your account is now
          fully activated! You can now log in and access all the features of our platform.
        </p>
        <router-link to="/signin">
          <base-button color="primary" class="w-full">SIGNIN</base-button>
        </router-link>
      </div>
    </div>
  </base-card>
</template>
