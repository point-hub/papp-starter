import { computed,ref } from 'vue';

import type { IAuthUser } from '@/stores/auth.store';
import { apiRequest } from '@/utils/api';

/**
 * Singleton state (shared across app)
 */
const user = ref<IAuthUser | null>(null);

/**
 * Auth composable
 */
export function useAuth() {
  const isAuthenticated = computed(() => !!user.value);

  const updateUser = (data: IAuthUser | null) => {
    user.value = data;
  };

  const signin = async (username: string, password: string) => {
    const response = await apiRequest.post('/auth/signin', {
      username,
      password,
    });
    updateUser(response.data);
    return response.data;
  };

  const me = async () => {
    try {
      const response = await apiRequest.get('/auth/me');
      updateUser(response.data);
      return response.data;
    } catch (err) {
      updateUser(null);
      throw err;
    }
  };

  const signout = async () => {
    await apiRequest.post('/auth/signout');
    updateUser(null);
  };

  const signup = async (payload: Record<string, unknown>) => {
    return apiRequest.post('/auth/signup', {
      ...payload,
    });
  };

  const verifyEmail = async (code: string) => {
    return apiRequest.post('/auth/verify-email', {
      code: code,
    });
  };

  const requestPassword = async (email: string) => {
    return apiRequest.post('/auth/request-password', {
      email,
    });
  };

  const resetPassword = async (code: string, password: string) => {
    return apiRequest.post('/auth/reset-password', {
      code,
      password,
    });
  };

  const sendEmailVerification = async (username: string) => {
    return apiRequest.post('/auth/send-email-verification', {
      username,
    });
  };

  const updateLastSeen = async () => {
    return apiRequest.post('/auth/update-last-seen');
  };

  return {
    user,
    isAuthenticated,
    updateUser,
    signin,
    signout,
    signup,
    me,
    verifyEmail,
    requestPassword,
    resetPassword,
    sendEmailVerification,
    updateLastSeen,
  };
}
