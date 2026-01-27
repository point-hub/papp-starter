<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import AppContainer from '@/components/app-container.vue';
import { findRoleApi } from '@/composables/api/master/roles/find-by-id.api';
import { updateRoleApi } from '@/composables/api/master/roles/update.api';
import router from '@/router';
import { toast } from '@/toast';
import { handleError } from '@/utils/api';

import CardBreadcrumbs from './card-breadcrumbs.vue';
import CardForm from './card-form.vue';
import CardInternalNotes from './card-internal-notes.vue';
import CardPermissions from './card-permissions.vue';
import CardReason from './card-reason.vue';
import { useForm } from './form';

const form = useForm();
const route = useRoute();

const isLoading = ref(false);
const isSaving = ref(false);

onMounted(async () => {
  try {
    isLoading.value = true;
    const response = await findRoleApi(route.params.id as string);
    if (response) {
      form.data.code = response.code;
      form.data.name = response.name;
      form.data.notes = response.notes;
      form.data.permissions = response.permissions;
    }
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

const update = async () => {
  try {
    isSaving.value = true;
    const response = await updateRoleApi(route.params.id as string, form.data);
    if (response?.matched_count) {
      toast('Update success', { color: 'success' });
      await router.push(`/master/roles/${route.params.id}`);
    }
  } catch (error) {
    const errorResponse = handleError(error);
    if (errorResponse.errors) {
      form.errors.code = errorResponse.errors.code || [];
      form.errors.name = errorResponse.errors.name || [];
      form.errors.notes = errorResponse.errors.notes || [];
      form.errors.permissions = errorResponse.errors.permissions || [];
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
    <card-permissions v-model:data="form.data" v-model:is-saving="isSaving" />
    <card-internal-notes v-model:data="form.data" v-model:errors="form.errors" v-model:is-saving="isSaving" />
    <card-reason v-model:data="form.data" v-model:errors="form.errors" v-model:is-saving="isSaving" />
    <div class="flex gap-2">
      <base-button class="flex-1" :is-loading="isSaving" color="primary" @click="update">Update</base-button>
    </div>
  </app-container>
</template>
