<script setup lang="ts">
import { type IForm } from './form';

const data = defineModel<IForm>('data', {
  default: () => ({
    email: '',
  }),
});
</script>

<template>
  <base-card>
    <div class="flex flex-col">
      <base-input
        label="Email Address"
        v-model="data.email"
        :disabled="true"
        description="Please enter a valid email address, as you need to confirm it to receive emails."
      />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
