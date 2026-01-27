<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import AppContainer from '@/components/app-container.vue';
import { findUserApi } from '@/composables/api/master/users/find-by-id.api';
import { updateUserApi } from '@/composables/api/master/users/update.api';
import { toast } from '@/toast';
import { handleError } from '@/utils/api';

import CardBreadcrumbs from './card-breadcrumbs.vue';
import CardForm from './card-form.vue';
import CardInternalNotes from './card-internal-notes.vue';
import CardReason from './card-reason.vue';
import CardRole from './card-role.vue';
import { useForm } from './form';

const form = useForm();
const route = useRoute();
const router = useRouter();

const isSaving = ref(false);
const isLoading = ref(false);
const selectedRole = ref();

onMounted(async () => {
  try {
    isLoading.value = true;
    const response = await findUserApi(route.params.id as string);
    form.data.name = response.name;
    form.data.role_id = response.role._id;
    form.data.notes = response.notes;

    selectedRole.value = {
      label: `[${response.role.code}] ${response.role.name}`,
      value: response.role._id,
    };
  } catch (error) {
    const errorResponse = handleError(error);
    if (errorResponse.message) {
      toast(errorResponse.message, {
        lists: errorResponse.lists,
        color: 'danger',
      });
    }
  } finally {
    isLoading.value = false;
  }
});

const onSave = async () => {
  try {
    isSaving.value = true;
    await updateUserApi(route.params.id as string, form.data);
    toast('Update success', { color: 'success' });
    await router.push(`/master/users/${route.params.id}`);
  } catch (error) {
    const errorResponse = handleError(error);
    if (errorResponse.errors) {
      form.errors.name = errorResponse.errors.name || [];
      form.errors.notes = errorResponse.errors.notes || [];
      form.errors.role_id = errorResponse.errors.role_id || [];
      form.errors.update_reason = errorResponse.errors.update_reason || [];
    }
    if (errorResponse.message) {
      toast(errorResponse.message, {
        lists: errorResponse.lists,
        color: 'danger',
      });
    }
  } finally {
    isSaving.value = false;
  }
};
</script>

<template>
  <app-container :is-loading="isLoading">
    <card-breadcrumbs />
    <card-form v-model:data="form.data" v-model:errors="form.errors" v-model:is-saving="isSaving" />
    <card-role v-model:data="form.data" v-model:errors="form.errors" v-model:is-saving="isSaving" />
    <card-internal-notes v-model:data="form.data" v-model:errors="form.errors" v-model:is-saving="isSaving" />
    <card-reason v-model:data="form.data" v-model:errors="form.errors" v-model:is-saving="isSaving" />
    <div class="flex gap-2">
      <base-button class="flex-1" :is-loading="isSaving" color="primary" @click="onSave">Save</base-button>
    </div>
  </app-container>
</template>
