<script setup lang="ts">
import { type IForm } from './form';

const data = defineModel<IForm>('data', {
  default: () => ({
    name: '',
    username: '',
    notes: '',
  }),
});
</script>

<template>
  <base-card title="User Information">
    <div class="flex flex-col gap-2">
      <base-input required v-model="data.name" label="Name" :disabled="true" />
      <base-input required v-model="data.username" label="Username" :disabled="true" />
      <base-textarea :min-height="128" v-model="data.notes" label="Notes" :disabled="true" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
