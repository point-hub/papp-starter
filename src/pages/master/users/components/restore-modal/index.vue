<script setup lang="ts">
import { ref } from 'vue';

import BaseConfirmActionModal from '@/components/base-confirm-action-modal.vue';
import { restoreUserApi } from '@/composables/api/master/users/restore.api';
import { toast } from '@/toast';
import { handleError } from '@/utils/api';

const confirmActionModalRef = ref();
const _id = ref();
const label = ref();
const emit = defineEmits(['restored']);

interface IData {
  _id: string
  label: string
}
const toggleModal = (data: IData) => {
  _id.value= data._id;
  label.value= data.label;
  confirmActionModalRef.value.toggleModal();
};

const isRestoring = ref(false);
const onRestore = async (reason: string) => {
  // prevent calling twice use loading state
  if (isRestoring.value) return;
  isRestoring.value = true;

  try {
    await restoreUserApi(_id.value as string, {
      update_reason: reason,
    });
    toast(`Restore Example "${label.value}" success`, { color: 'success' });
    emit('restored');
  } catch (error) {
    const errorResponse = handleError(error);
    if (errorResponse.message) {
      toast(errorResponse.message, {
        lists: errorResponse.lists,
        color: 'danger',
      });
    }
  } finally {
    // stop loading state
    isRestoring.value = false;
  }
};

defineExpose({
  toggleModal,
  isRestoring,
});
</script>

<template>
  <base-confirm-action-modal
    ref="confirmActionModalRef"
    title="Restore Example"
    require-reason
    @success="onRestore"
  >
    <div>
      <p>Are you sure want to restore "<b>{{ label }}</b>"?</p>
    </div>
  </base-confirm-action-modal>
</template>
