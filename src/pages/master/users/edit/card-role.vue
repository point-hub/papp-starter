<script setup lang="ts">
import { ref, watch } from 'vue';

import { getRolesApi } from '@/composables/api/master/roles/get.api';

import { type IForm, type IFormError } from './form';

const data = defineModel<IForm>('data', {
  default: () => ({ role_id: '' }),
});
const errors = defineModel<IFormError>('errors', {
  default: () => ({ role_id: [] }),
});

const options = ref<{ label: string; value: string }[]>([]);
const isSaving = defineModel('is-saving', { default: false });

watch(
  () => data.value?.role_id,
  async (roleId) => {
    if (!roleId) {
      const response = await getRolesApi();

      options.value = response.data.map(data => ({
        label: `[${data.code}] ${data.name}`,
        value: data._id,
      }));
    } else {
      const response = await getRolesApi({
        search: { _id: roleId },
      });

      options.value = response.data.map(data => ({
        label: `[${data.code}] ${data.name}`,
        value: data._id,
      }));
    }
  },
  { immediate: true },
);
</script>


<template>
  <base-card>
    <div class="flex flex-col gap-2">
      <base-select
        :key="options.length"
        label="Role"
        required
        v-model:selectedValue="data.role_id"
        :options="options"
        :errors="errors.role_id"
        :disabled="isSaving"
        placeholder="Select"
        description="Select a role for managing what actions they can perform within a system."
      />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
