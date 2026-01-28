import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import { reauthenticateApi } from '@/composables/api/master/auth/reauthenticate.api';
import { refreshTokenApi } from '@/composables/api/master/auth/refresh-token.api';
import { signinApi } from '@/composables/api/master/auth/signin.api';
import { signoutApi } from '@/composables/api/master/auth/signout.api';

export interface IAuthUser {
  _id?: string
  username?: string
  name?: string
  email?: string
  role?: {
    _id?: string
    name?: string
    permissions?: string[]
  }
}

export const useAuthStore = defineStore('auth-store', () => {
  const authUser = ref<IAuthUser>();

  const isAuthenticated = computed(() => !!authUser.value);

  const signin = async (username: string, password: string, remember_me = false) => {
    const response = await signinApi({
      username,
      password,
      remember_me,
    });

    authUser.value = response;
  };

  const signout = async () => {
    await signoutApi();

    authUser.value = undefined;
  };

  const reauthenticate = async () => {
    const response = await reauthenticateApi();

    authUser.value = response;
  };

  const refreshToken = async () => {
    const response = await refreshTokenApi();

    authUser.value = response;
  };

  const hasRole = (name: string) => {
    return authUser.value?.role?.name === name;
  };

  const hasPermission = (name: string) => {
    return authUser.value?.role?.permissions?.includes(name);
  };

  const hasPermissions = (permissions: string[]) => {
    const userPermissions = authUser.value?.role?.permissions ?? [];
    return permissions.every(p => userPermissions.includes(p));
  };

  return {
    authUser,
    signin,
    signout,
    reauthenticate,
    refreshToken,
    isAuthenticated,
    hasRole,
    hasPermission,
    hasPermissions,
  };
});
