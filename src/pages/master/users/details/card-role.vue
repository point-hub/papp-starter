<script setup lang="ts">
import { type IForm } from './form';

const data = defineModel<IForm>('data', {
  default: () => ({
    role: {
      code: '',
      name: '',
    },
  }),
});
</script>

<template>
  <base-card>
    <div class="flex flex-col gap-2">
      <base-input
        label="Role"
        :model-value="`[${data.role.code}] ${data.role.name}`"
        :disabled="true"
        placeholder="Select"
        description="Select a role for managing what actions they can perform within a system."
      />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
