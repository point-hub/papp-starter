<script setup lang="ts">
import { ref } from 'vue';

import BaseConfirmActionModal from '@/components/base-confirm-action-modal.vue';
import { archiveExampleApi } from '@/composables/api/master/examples/archive.api';
import { toast } from '@/toast';
import { handleError } from '@/utils/api';

const confirmActionModalRef = ref();
const _id = ref();
const label = ref();
const emit = defineEmits(['archived']);

interface IData {
  _id: string
  label: string
}
const toggleModal = (data: IData) => {
  _id.value= data._id;
  label.value= data.label;
  confirmActionModalRef.value.toggleModal();
};

const isArchiving = ref(false);
const onArchive = async (reason: string) => {
  // prevent calling twice use loading state
  if (isArchiving.value) return;
  isArchiving.value = true;

  try {
    await archiveExampleApi(_id.value as string, {
      update_reason: reason,
    });
    toast(`Archive Example "${label.value}" success`, { color: 'success' });
    emit('archived');
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
    isArchiving.value = false;
  }
};

defineExpose({
  toggleModal,
  isArchiving,
});
</script>

<template>
  <base-confirm-action-modal
    ref="confirmActionModalRef"
    title="Archive Example"
    require-reason
    @success="onArchive"
  >
    <div>
      <p>Are you sure want to archive "<b>{{ label }}</b>"?</p>
      <p>You can restore it later.</p>
    </div>
  </base-confirm-action-modal>
</template>
