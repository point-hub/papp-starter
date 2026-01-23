import type { Message,Realtime, RealtimeChannel } from 'ably';
import { type Ref,ref } from 'vue';

import { useAuthStore } from '@/stores/auth.store';

import { useAbly } from './ably';
import { useNotification } from './notification';

// Global registry (singleton storage)
const registry: Record<
  string,
  {
    channel: RealtimeChannel | null
    messages: Ref<Message[]>
    isInitialized: boolean
    isSubscribed: boolean
  }
> = {};

// Global subscribe handlers (to avoid multiple subscribe)
const subscribeHandlers: Record<string, (msg: Message) => void> = {};

export function useAblyChannel(channelName: string) {
  // Create slot if not exists
  if (!registry[channelName]) {
    registry[channelName] = {
      channel: null,
      messages: ref([]),
      isInitialized: false,
      isSubscribed: false,
    };
  }

  const state = registry[channelName];
  const { incrementUnread } = useNotification();

  /** Init channel (only once) */
  const initChannel = async () => {
    if (state.isInitialized) return;

    const realtime = await useAbly();
    await ensureConnected(realtime);

    state.channel = realtime.channels.get(channelName);
    await ensureAttached(state.channel);

    state.isInitialized = true;
  };

  /** Subscribe (once globally) */
  const subscribe = async () => {
    const { isAuthenticated } = useAuthStore();
    if (!isAuthenticated) {
      return;
    }

    await initChannel();
    if (!state.channel) return;
    if (state.isSubscribed) return;

    if (!subscribeHandlers[channelName]) {
      subscribeHandlers[channelName] = (msg: Message) => {
        state.messages.value.push(msg);
        if (msg.name === 'notifications:new') {
          incrementUnread();
        }
      };
    }

    state.channel.subscribe(subscribeHandlers[channelName]);
    state.isSubscribed = true;
  };

  /** Publish */
  const publish = async (event: string, data: Message) => {
    await initChannel();
    await ensureAttached(state.channel!);
    state.channel!.publish(event, data);
  };

  return {
    channel: ref(state.channel),
    messages: state.messages,
    subscribe,
    publish,
  };
}

/** Utilities */
const ensureConnected = (realtime: Realtime): Promise<void> => {
  if (realtime.connection.state === 'connected') return Promise.resolve();

  return new Promise((resolve, reject) => {
    realtime.connection.once('connected', () => resolve());
    realtime.connection.once('failed', () => reject());
    realtime.connect();
  });
};

const ensureAttached = (ch: RealtimeChannel): Promise<void> => {
  if (ch.state === 'attached') return Promise.resolve();

  return new Promise((resolve, reject) => {
    ch.once('attached', () => resolve());
    ch.once('failed', () => reject());
    if (ch.state !== 'attaching') ch.attach();
  });
};
