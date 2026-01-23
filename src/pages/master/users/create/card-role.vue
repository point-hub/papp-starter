<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import { getRolesApi, type IRoleData } from '@/composables/api/master/roles/get.api';

import { type IForm, type IFormError } from './form';

const data = defineModel<IForm>('data', {
  default: () => ({
    role_id: '',
  }),
});
const errors = defineModel<IFormError>('errors', {
  default: () => ({
    role_id: [],
  }),
});

const roles = ref<IRoleData[]>([]);
const options = computed(() =>
  roles.value.map((role: IRoleData) => ({
    label: `[${role.code}] ${role.name}`,
    value: role._id,
  })),
);

const isSaving = defineModel('is-saving', { default: false });

onMounted(async () => {
  const response = await getRolesApi({
    page: 1,
    page_size: 10,
  });
  roles.value = response.data;
});
</script>

<template>
  <base-card>
    <div class="flex flex-col gap-2">
      <base-select label="Role"
        required
        v-model:selectedValue="data.role_id"
        :options="options"
        :errors="errors.role_id"
        :disabled="isSaving"
        placeholder="Select" description="Select a role for managing what actions they can perform within a system."
      />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
