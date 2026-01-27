<script setup lang="ts">
import { ref } from 'vue';

import { isEmailExistsApi } from '@/composables/api/master/auth/is-email-exists.api';
import { signupApi } from '@/composables/api/master/auth/signup.api';
import { usePassword } from '@/composables/password';
import { toast } from '@/toast';
import { handleError } from '@/utils/api';

import { useForm } from './form';
import signupSuccess from './signup-success.vue';

const form = useForm();
const password = usePassword();
const isSignupSuccess = ref(false);
const signupEmail = ref();

const onEmailChange = async () => {
  try {
    const response = await isEmailExistsApi({ email: form.data.value.email });
    if (response.exists === true) {
      form.errors.value.email = ['Email already exists'];
    }
  } catch (error) {
    const errorResponse = handleError(error);

    if (errorResponse.errors) {
      form.errors.value.email = errorResponse.errors.email || [];
    }

    if (errorResponse.message) {
      toast(errorResponse.message, {
        lists: errorResponse.lists,
        color: 'danger',
        timer: 5000,
      });
    }
  }
};

const onSubmit = async () => {
  if ((form.errors.value.password?.length ?? 0) > 0) {
    return toast('Please use a strong password', { color: 'danger' });
  }

  if (!form.isPasswordConfirmed.value) {
    form.errors.value.confirm_password = ['Password do not match'];
    return toast('Password confirmation does not match', { color: 'danger' });
  }

  if (!form.data.value.accept_terms) {
    return toast('Please accept terms & privacy', { color: 'danger' });
  }

  try {
    const response = await signupApi(form.data.value);
    if (response) {
      signupEmail.value = form.data.value.email;
      form.reset();
      isSignupSuccess.value = true;
    }
  } catch (error) {
    const errorResponse = handleError(error);

    if (errorResponse.errors) {
      form.errors.value.name = errorResponse.errors.name || [];
      form.errors.value.username = errorResponse.errors.username || [];
      form.errors.value.email = errorResponse.errors.email || [];
      form.errors.value.password = errorResponse.errors.password || [];
      form.errors.value.confirm_password = errorResponse.errors.confirm_password || [];
      form.errors.value.accept_terms = errorResponse.errors.accept_terms || [];
    }

    if (errorResponse.message) {
      toast(errorResponse.message, {
        lists: errorResponse.lists,
        color: 'danger',
      });
    }
  }
};
</script>

<template>
  <base-card v-if="!isSignupSuccess" class="max-w-xl">
    <form @submit.prevent="onSubmit" class="flex flex-col gap-8">
      <div class="flex flex-col gap-4">
        <base-input label="Name" layout="vertical" v-model="form.data.value.name" :errors="form.errors.value.name" />
        <base-input label="Username" layout="vertical" v-model="form.data.value.username" :errors="form.errors.value.username" />
        <base-input required label="Email" layout="vertical" v-model="form.data.value.email" :errors="form.errors.value.email" @change="onEmailChange" />

        <base-input
          required
          label="Password"
          layout="vertical"
          :type="password.type.value"
          v-model="form.data.value.password"
          :errors="form.errors.value.password"
          @keyup="form.validatePassword()"
          :reset-errors-on-update="false"
        >
          <template #suffix>
            <base-button @click="password.toggle" variant="text">
              <base-icon icon="i-fa7-regular:eye" />
            </base-button>
          </template>
        </base-input>

        <base-input
          required
          label="Confirm Password"
          layout="vertical"
          :type="password.type.value"
          v-model="form.data.value.confirm_password"
          :errors="form.errors.value.confirm_password"
          @keyup="form.validateConfirmationPassword()"
          :reset-errors-on-update="false"
        >
          <template #suffix>
            <base-button @click="password.toggle" variant="text">
              <base-icon icon="i-fa7-regular:eye" />
            </base-button>
          </template>
        </base-input>

        <div class="flex items-center gap-2">
          <base-checkbox v-model="form.data.value.accept_terms" />
          <p>
            Accept
            <a href="https://pointhub.net/privacy" target="_blank">Privacy</a>
            &
            <a href="https://pointhub.net/terms" target="_blank">Terms</a>
          </p>
        </div>
      </div>

      <base-button type="submit" color="primary">Sign Up</base-button>
    </form>
  </base-card>

  <signup-success v-else :email="signupEmail" />
</template>
