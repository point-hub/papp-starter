import { ref } from 'vue';

const unreadCount = ref(0);

export const useNotification = () => {

  const incrementUnread = () => {
    unreadCount.value++;
  };

  const clearUnread = () => {
    unreadCount.value = 0;
  };

  return {
    unreadCount,
    incrementUnread,
    clearUnread,
  };
};
