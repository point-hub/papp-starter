<script setup lang="ts">
import { ref } from 'vue';

import { verifyPasswordApi } from '@/composables/api/master/auth/verify-password.api';
import { toast } from '@/toast';
import { handleError } from '@/utils/api';

import { useForm } from './base-confirm-action-form';

interface IProps {
  title: string
  requireReason?: boolean
  requirePassword?: boolean
  confirmText?: string
  cancelText?: string
}

const props = withDefaults(defineProps<IProps>(), {
  requireReason: false,
  requirePassword: false,
  confirmText: 'Confirm',
  cancelText: 'Cancel',
});

const emit = defineEmits(['close', 'success']);
const form = useForm();
const showModal = ref(false);
const toggleModal = (state?: boolean) => {
  showModal.value = state ?? !showModal.value;
  if (!showModal.value) {
    form.reset();
    isLoading.value = false;
  }
};


const isLoading = ref(false);
const onSubmit = async () => {
  // prevent calling twice use loading state
  if (isLoading.value) {
    return;
  }

  // optional to require password
  if (props.requirePassword && form.data.password === '') {
    form.errors.password = ['Password is required.'];
    return;
  }

  // optional to require reason
  if (props.requireReason && form.data.reason === '') {
    form.errors.reason = ['Reason is required.'];
    return;
  }

  try {
    // start loading state
    isLoading.value = true;
    // check password
    if (props.requirePassword) {
      const responseVerifyPasswordUsersApi = await verifyPasswordApi({
        password: form.data.password!,
      });

      if (!responseVerifyPasswordUsersApi) {
        form.errors.password = ['Authentication failed'];
        return;
      }
    }

    emit('success', form.data.reason);
    form.reset();
    toggleModal(false);
  } catch (error) {
    const errorResponse = handleError(error);
    if(errorResponse.message === 'Invalid Credentials') {
      form.errors.password = ['Wrong password.'];
    }
    if (errorResponse.errors) {
      form.errors.password = errorResponse.errors.password || [];
      form.errors.reason = errorResponse.errors.reason || [];
    }
    if (errorResponse.message) {
      toast(errorResponse.message, {
        lists: errorResponse.lists,
        color: 'danger',
      });
    }
  } finally {
    // stop loading state
    isLoading.value = false;
  }
};

defineExpose({
  toggleModal,
  isLoading,
});
</script>

<template>
  <base-modal :title="title" :is-open="showModal" @on-close="toggleModal(false)">
    <div class="max-h-90vh overflow-auto">
      <div class="space-y-4">
        <slot></slot>
        <div class="flex flex-col gap-2">
          <base-input
            v-if="requirePassword"
            autofocus
            required
            type="password"
            layout="v"
            label="Password"
            v-model="form.data.password"
            :errors="form.errors.password"
            :helpers="['Please enter your password to make sure this isn’t done by accident.']"
            border="full"
          />
          <base-textarea
            v-if="requireReason"
            required
            :autofocus="!requirePassword"
            layout="v"
            label="Reason"
            v-model="form.data.reason"
            :errors="form.errors.reason"
            :min-height="64" :helpers="['Leaving a reason helps you remember why you did this action.']"
            border="full"
          />
        </div>
        <div class="flex gap-2">
          <base-button color="danger" @click="onSubmit()" :disabled="isLoading">{{ confirmText }}</base-button>
          <base-button color="secondary" @click="toggleModal(false)">{{ cancelText }}</base-button>
        </div>
      </div>
    </div>
  </base-modal>
</template>
