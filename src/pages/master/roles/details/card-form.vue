<script setup lang="ts">
import { type IForm } from './form';

const data = defineModel<IForm>('data', {
  default: () => ({
    name: undefined,
  }),
});
</script>

<template>
  <base-card title="Role">
    <div class="flex flex-col gap-4">
      <base-input layout="horizontal" label="Name" readonly v-model="data.name" border="full" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
