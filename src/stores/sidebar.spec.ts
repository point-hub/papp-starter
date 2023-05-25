import { describe, beforeEach, expect, it } from 'vitest'
import { useSidebarStore } from './sidebar'
import { setActivePinia, createPinia } from 'pinia'

describe('sidebar store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should be defined', () => {
    const sidebarStore = useSidebarStore()
    expect(sidebarStore.$state.isSidebarOpen).toBeDefined()
    expect(typeof sidebarStore.$state.isSidebarOpen).toBe('boolean')
    expect(sidebarStore.openSidebar).toBeDefined()
    expect(sidebarStore.closeSidebar).toBeDefined()
    expect(sidebarStore.toggleSidebar).toBeDefined()
  })

  it('openSidebar() should update state isSidebarOpen to be true', () => {
    const sidebarStore = useSidebarStore()
    sidebarStore.openSidebar()
    expect(sidebarStore.$state.isSidebarOpen).toBe(true)
  })

  it('closeSidebar() should update state isSidebarOpen to be false', () => {
    const sidebarStore = useSidebarStore()
    sidebarStore.closeSidebar()
    expect(sidebarStore.$state.isSidebarOpen).toBe(false)
  })

  it('toggleSidebar() should update state isSidebarOpen to the opposite state', () => {
    const sidebarStore = useSidebarStore()
    const currentState = sidebarStore.$state.isSidebarOpen
    sidebarStore.toggleSidebar()
    expect(sidebarStore.$state.isSidebarOpen).not.toBe(currentState)
    expect(sidebarStore.$state.isSidebarOpen === true || sidebarStore.$state.isSidebarOpen === false).toBeTruthy()
  })
})
