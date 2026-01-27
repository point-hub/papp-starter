<script setup lang="ts">
import { ref } from 'vue';

import BaseConfirmActionModal from '@/components/base-confirm-action-modal.vue';
import { toast } from '@/toast';
import { handleError } from '@/utils/api';

const confirmActionModalRef = ref();
const emit = defineEmits(['confirmed']);

const toggleModal = () => {
  confirmActionModalRef.value.toggleModal();
};

const isConfirming = ref(false);
const onConfirm = async () => {
  // prevent calling twice use loading state
  if (isConfirming.value) return;
  isConfirming.value = true;

  try {
    emit('confirmed');
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
    isConfirming.value = false;
  }
};

defineExpose({
  toggleModal,
  isConfirming,
});
</script>

<template>
  <base-confirm-action-modal
    ref="confirmActionModalRef"
    title="Password Confirmation"
    require-password
    @success="onConfirm"
  >
  </base-confirm-action-modal>
</template>
