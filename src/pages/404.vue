<script setup lang="ts"></script>

<template>
  <div class="bg-slate-50 dark:bg-slate-900 w-screen h-screen">
    <div class="mx-auto max-w-xl py-10">
      <base-card>
        <div class="flex flex-col gap-2">
          <div>
            <p class="text-xs text-red">Error 404</p>
          </div>

          <div>
            <h1 class="text-3xl">Page not found</h1>
            <p>The page you are looking for doesn't exist.</p>
          </div>

          <div class="mt-4 flex gap-2">
            <router-link to="/">
              <base-button color="primary" size="lg">Go to Homepage</base-button>
            </router-link>
          </div>
        </div>
      </base-card>
    </div>
  </div>
</template>

<style scoped></style>
