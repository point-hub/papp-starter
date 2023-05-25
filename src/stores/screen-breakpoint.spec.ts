import { describe, beforeEach, expect, it } from 'vitest'
import { useScreenBreakpointStore } from './screen-breakpoint'
import { setActivePinia, createPinia } from 'pinia'

describe('screen breakpoint store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('defined', () => {
    const screenBreakpoint = useScreenBreakpointStore()
    expect(screenBreakpoint.$state.windowWidth).toBeDefined()
    expect(screenBreakpoint.$state.windowHeight).toBeDefined()
    expect(screenBreakpoint.$state.screenBreakpoint).toBeDefined()
    expect(screenBreakpoint.onResizeWindow).toBeDefined()
  })
})
