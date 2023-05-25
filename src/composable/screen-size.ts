import { useScreenBreakpointStore } from '@/stores/screen-breakpoint'
import { onMounted, nextTick, onBeforeUnmount } from 'vue'

export function useScreenSize() {
  const screenBreakpointStore = useScreenBreakpointStore()

  onMounted(async () => {
    screenBreakpointStore.onResizeWindow()
    await nextTick(() => {
      window.addEventListener('resize', screenBreakpointStore.onResizeWindow)
    })
  })

  onBeforeUnmount(async () => {
    await nextTick(() => {
      window.removeEventListener('resize', screenBreakpointStore.onResizeWindow)
    })
  })
}
