import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', {
  state: () => ({
    isSidebarOpen: document.body.classList.contains('is-sidebar-open')
  }),
  actions: {
    toggleSidebar() {
      this.isSidebarOpen = document.body.classList.contains('is-sidebar-open')
      if (this.isSidebarOpen) {
        this.closeSidebar()
      } else {
        this.openSidebar()
      }
    },
    openSidebar() {
      document.body.classList.add('is-sidebar-open')
      this.isSidebarOpen = true
    },
    closeSidebar() {
      document.body.classList.remove('is-sidebar-open')
      this.isSidebarOpen = false
    }
  }
})
