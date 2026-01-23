import type { ChatClient } from '@ably/chat';
import { inject } from 'vue';

import { DI } from '@/plugins/ably';

let cachedChat: ChatClient | null = null;

export async function useAblyChat(): Promise<ChatClient> {
  if (cachedChat) return cachedChat;

  const getChat = inject<() => Promise<ChatClient>>(DI.ABLY_CHAT);
  if (!getChat) {
    throw new Error('Ably plugin not installed');
  }

  cachedChat = await getChat();
  return cachedChat;
}
