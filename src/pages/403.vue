<script setup lang="ts"></script>

<template>
  <div class="bg-slate-50 dark:bg-slate-900 w-screen h-screen">
    <div class="mx-auto max-w-xl py-10">
      <base-card class="rounded-xl">
        <div class="flex flex-col gap-2">
          <div>
            <p class="text-xs text-red">Error 403</p>
          </div>

          <div>
            <h1>Forbidden Access</h1>
            <p>You don't have necessary permissions for this resource.</p>
          </div>

          <div class="mt-4 flex gap-2">
            <base-link href="/" color="primary">Go to Homepage</base-link>
          </div>
        </div>
      </base-card>
    </div>
  </div>
</template>

<style scoped></style>
