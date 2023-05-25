import { describe, beforeEach, expect, it } from 'vitest'
import { useSidebarMenuStore } from './sidebar-menu'
import { setActivePinia, createPinia } from 'pinia'

describe('sidebar menu store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('defined', () => {
    const sidebarMenuStore = useSidebarMenuStore()
    expect(sidebarMenuStore.$state.shortcut).toBeDefined()
  })
})
