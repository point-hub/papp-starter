<script setup lang="ts">
import { type IForm } from './form';

const data = defineModel<IForm>('data', {
  default: () => ({
    notes: '',
  }),
});
</script>

<template>
  <base-card title="Internal Notes">
    <div class="flex flex-col gap-2">
      <base-textarea readonly :min-height="128" v-model="data.notes" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
