import type { Realtime } from 'ably';
import { inject } from 'vue';

import { DI } from '@/plugins/ably';

let cachedAbly: Realtime | null = null;

export async function useAbly(): Promise<Realtime> {
  if (cachedAbly) return cachedAbly;

  const getAbly = inject<() => Promise<Realtime>>(DI.ABLY);
  if (!getAbly) {
    throw new Error('Ably plugin not installed');
  }
  cachedAbly = await getAbly();
  return cachedAbly;
}
