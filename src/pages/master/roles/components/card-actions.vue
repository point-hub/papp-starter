<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useAuthStore } from '@/stores/auth.store';

import type { IForm } from '../details/form';
import ArchiveModal from './archive-modal/index.vue';
import DeleteModal from './delete-modal/index.vue';
import RestoreModal from './restore-modal/index.vue';

const emit = defineEmits(['archived', 'restored']);

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();
const archiveModalRef = ref();
const restoreModalRef = ref();
const deleteModalRef = ref();
const role = defineModel<IForm>('data');

/**
 * Opens the archive confirmation modal for a specific role.
 */
const onArchiveModal = () => {
  archiveModalRef.value.toggleModal({
    _id: role.value?._id,
    label: `[${role.value?.code}] ${role.value?.name}`,
  });
};

/**
 * Handler called after a successful archive.
 */
const onArchived = async () => {
  emit('archived');
};

/**
 * Opens the restore confirmation modal for a specific role.
 */
const onRestoreModal = () => {
  restoreModalRef.value.toggleModal({
    _id: role.value?._id,
    label: `[${role.value?.code}] ${role.value?.name}`,
  });
};

/**
 * Handler called after a successful restore.
 */
const onRestored = async () => {
  emit('restored');
};

/**
 * Opens the delete confirmation modal for a specific role.
 */
const onDeleteModal = () => {
  deleteModalRef.value.toggleModal({
    _id: role.value?._id,
    label: `[${role.value?.code}] ${role.value?.name}`,
  });
};

/**
 * Handler called after a successful deletion.
 */
const onDeleted = async () => {
  await router.push('/master/roles');
};
</script>

<template>
  <archive-modal ref="archiveModalRef" @archived="onArchived" />
  <restore-modal ref="restoreModalRef" @restored="onRestored" />
  <delete-modal ref="deleteModalRef" @deleted="onDeleted" />

  <base-card class="py-3! gap-0!">
    <div class="flex gap-2 overflow-auto scrollbar-hidden">
      <router-link v-if="authStore.hasPermission('roles:create')" :to="`/master/roles/create`">
        <base-button variant="filled" color="primary" size="sm" class="font-bold">
          <base-icon icon="i-fa7-solid:file-plus" /> CREATE
        </base-button>
      </router-link>
      <router-link v-if="authStore.hasPermission('roles:update') && role?._id" :to="`/master/roles/${route.params.id}/edit`">
        <base-button variant="filled" color="primary" size="sm" class="font-bold">
          <base-icon icon="i-fa7-solid:file-pen" /> EDIT
        </base-button>
      </router-link>
      <router-link v-if="authStore.hasPermission('roles:read')" :to="`/master/roles/${route.params.id}/histories`">
        <base-button variant="filled" color="primary" size="sm" class="font-bold">
          <base-icon icon="i-fa7-solid:rectangle-history-circle-user" /> HISTORIES
        </base-button>
      </router-link>
      <router-link v-if="authStore.hasPermission('audit-logs:read')" :to="`/master/roles/${route.params.id}/audits`">
        <base-button variant="filled" color="primary" size="sm" class="font-bold">
          <base-icon icon="i-fa7-solid:file-magnifying-glass" /> AUDITS
        </base-button>
      </router-link>
      <base-button v-if="authStore.hasPermission('roles:delete') && role?._id" @click="onDeleteModal" variant="filled" color="primary" size="sm" class="font-bold">
        <base-icon icon="i-fa7-solid:trash-xmark" /> DELETE
      </base-button>
      <base-button v-if="authStore.hasPermission('roles:update') && role?._id && !role.is_archived" @click="onArchiveModal" variant="filled" color="primary" size="sm" class="font-bold">
        <base-icon icon="i-fa7-solid:box-archive" /> ARCHIVE
      </base-button>
      <base-button v-if="authStore.hasPermission('roles:update') && role?._id && role.is_archived" @click="onRestoreModal" variant="filled" color="primary" size="sm" class="font-bold">
        <base-icon icon="i-fa7-solid:box-arrow-up" /> RESTORE
      </base-button>
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
