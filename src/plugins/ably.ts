import { ChatClient } from '@ably/chat';
import { type ErrorInfo, Realtime, type TokenRequest } from 'ably';
import type { App } from 'vue';

import apiConfig from '@/config/api';
import { apiRequest } from '@/utils/api';

type AblyProvider = () => Promise<Realtime>;
type ChatProvider = () => Promise<ChatClient>;

export const DI = {
  ABLY: 'ably',
  ABLY_CHAT: 'ablyChat',
} as const;

export const AblyPlugin = {
  install(app: App) {
    let ablyInstance: Realtime | null = null;
    let chatInstance: ChatClient | null = null;
    let connecting: Promise<void> | null = null;

    async function getAbly(): Promise<Realtime> {
      if (ablyInstance) return ablyInstance;

      if (connecting) {
        await connecting;
        return ablyInstance!;
      }

      connecting = (async () => {
        const client = new Realtime({
          autoConnect: false,
          echoMessages: false,
          authCallback: async (params, callback) => {
            try {
              const res = await apiRequest.post(`${apiConfig.baseURL}/v1/ably/token`, params);
              const token: TokenRequest = res.data;
              callback(null, token);
            } catch (err) {
              console.error('[Ably] Auth failed:', err);
              callback(err as ErrorInfo, null);
            }
          },
        });

        client.connect();
        ablyInstance = client;
        connecting = null;
      })();

      await connecting;
      return ablyInstance!;
    }

    async function getChat(): Promise<ChatClient> {
      if (chatInstance) return chatInstance;
      const ably = await getAbly();
      chatInstance = new ChatClient(ably);
      return chatInstance;
    }

    app.provide(DI.ABLY, getAbly as AblyProvider);
    app.provide(DI.ABLY_CHAT, getChat as ChatProvider);

    // HMR cleanup
    if (import.meta.hot) {
      import.meta.hot.dispose(() => {
        ablyInstance?.close();
        ablyInstance = null;
        chatInstance = null;
        connecting = null;
      });
    }
  },
};
