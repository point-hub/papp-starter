import { defineStore } from 'pinia'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

/**
 * Shortcut using dynamic icon on the fly, at the compile time
 * we can't possibility know all the combination of the utilities.
 * For that, you can configure your icon to the safelist option.
 *
 * https://unocss.dev/guide/extracting#safelist
 */

export interface ShortcutInterface {
  name: string
  icon: string
  menu: Array<MenuInterface>
  path?: string
  link?: string
}

export interface MenuInterface {
  name: string
  path?: string
  link?: string
  separator?: boolean
  submenu?: SubmenuInterface[]
}

export interface SubmenuInterface {
  name: string
  path?: string
  link?: string
  separator?: boolean
}

interface StateInterface {
  shortcut: ShortcutInterface[]
  activeShortcut: ShortcutInterface
  activeShortcutIndex: number
  activeMenuName: string
}

export const useSidebarMenuStore = defineStore('sidebar-menu', {
  state: (): StateInterface => ({
    shortcut: [menuMain, menuTemplate],
    activeShortcut: menuMain,
    activeShortcutIndex: 0,
    activeMenuName: ''
  }),
  actions: {
    findActiveShortcut(route: RouteLocationNormalizedLoaded) {
      for (const [index, shortcut] of this.$state.shortcut.entries()) {
        if (route.path === shortcut.path) {
          this.$state.activeShortcut = shortcut
          this.$state.activeShortcutIndex = index
          return
        }
        for (const menu of shortcut.menu) {
          if (route.path.includes(menu.path as string)) {
            this.$state.activeShortcut = shortcut
            this.$state.activeShortcutIndex = index
            this.$state.activeMenuName = menu.name
            return
          }
          if (menu.submenu) {
            for (const submenu of menu.submenu) {
              if (route.path.includes(submenu.path as string)) {
                this.$state.activeShortcut = shortcut
                this.$state.activeShortcutIndex = index
                this.$state.activeMenuName = menu.name
                return
              }
            }
          }
        }
        if (route.path.split('/')[1] === shortcut.path?.split('/')[1]) {
          this.$state.activeShortcut = shortcut
          this.$state.activeShortcutIndex = index
          return
        }
      }
    },
    toggleMenu(name: string) {
      if (this.$state.activeMenuName === name) {
        this.$state.activeMenuName = ''
      } else {
        this.$state.activeMenuName = name
      }
    },
    hasChildren(route: RouteLocationNormalizedLoaded) {
      for (const shortcut of this.$state.shortcut) {
        if (shortcut.path === route.path) return true
        for (const menu of shortcut.menu) {
          if (menu.path === route.path && menu.submenu) return true
        }
      }
    }
  }
})

const menuMain = {
  name: 'Main Menu',
  path: '/',
  icon: 'i-fad-house-chimney',
  menu: [
    {
      name: 'Dashboard',
      path: '/dashboard'
    },
    {
      name: 'Page 1',
      path: '/page-1'
    },
    {
      name: 'Page 2',
      path: '/page-2'
    },
    {
      name: 'Nested',
      submenu: [
        {
          name: 'Page Nested 1',
          path: '/nested/page-nested-1'
        },
        {
          name: 'Page Nested 2',
          path: '/nested/page-nested-2'
        }
      ]
    }
  ]
}

const menuTemplate = {
  name: 'Template',
  path: '/template',
  icon: 'i-fad-wand-magic-sparkles',
  menu: [
    {
      name: 'Components',
      submenu: [
        {
          name: 'Accordion',
          path: '/template/components/accordion'
        },
        {
          name: 'Alert',
          path: '/template/components/alert'
        },
        {
          name: 'Avatar',
          path: '/template/components/avatar'
        },
        {
          name: 'Badge',
          path: '/template/components/badge'
        },
        {
          name: 'Breadcrumb',
          path: '/template/components/breadcrumb'
        },
        {
          name: 'Button',
          path: '/template/components/button'
        },
        {
          name: 'Button Group',
          path: '/template/components/button-group'
        },
        {
          name: 'Card',
          path: '/template/components/card'
        },
        {
          name: 'Collapse',
          path: '/template/components/collapse'
        },
        {
          name: 'Divider',
          path: '/template/components/divider'
        },
        {
          name: 'Dropdown',
          path: '/template/components/dropdown'
        },
        {
          name: 'Mask',
          path: '/template/components/mask'
        },
        {
          name: 'Modal',
          path: '/template/components/modal'
        },
        {
          name: 'Notification',
          path: '/template/components/notification'
        },
        {
          name: 'Popover',
          path: '/template/components/popover'
        },
        {
          name: 'Progress',
          path: '/template/components/progress'
        },
        {
          name: 'Skeleton',
          path: '/template/components/skeleton'
        },
        {
          name: 'Spinner',
          path: '/template/components/spinner'
        },
        {
          name: 'Starter',
          path: '/template/components/starter'
        },
        {
          name: 'Steps',
          path: '/template/components/steps'
        },
        {
          name: 'Table',
          path: '/template/components/table'
        },
        {
          name: 'Table Advance',
          path: '/template/components/table-advance'
        },
        {
          name: 'Tabs',
          path: '/template/components/tabs'
        },
        {
          name: 'Timeline',
          path: '/template/components/timeline'
        },
        {
          name: 'Tooltip',
          path: '/template/components/tooltip'
        },
        {
          name: 'Treeview',
          path: '/template/components/treeview'
        },
        {
          name: 'Typography',
          path: '/template/components/typography'
        }
      ]
    },
    {
      name: 'Forms',
      submenu: [
        {
          name: 'Autocomplete',
          path: '/template/forms/autocomplete'
        },
        {
          name: 'Input Text',
          path: '/template/forms/input-text'
        },
        {
          name: 'Input Group',
          path: '/template/forms/input-group'
        },
        {
          name: 'Input Mask',
          path: '/template/forms/input-mask'
        },
        {
          name: 'Checkbox',
          path: '/template/forms/checkbox'
        },
        {
          name: 'Datepicker',
          path: '/template/forms/datepicker'
        },
        {
          name: 'File Upload',
          path: '/template/forms/file-upload'
        },
        {
          name: 'Radio',
          path: '/template/forms/radio'
        },
        {
          name: 'Radio Group',
          path: '/template/forms/radio-group'
        },
        {
          name: 'Switch',
          path: '/template/forms/switch'
        },
        {
          name: 'Select',
          path: '/template/forms/select'
        },
        {
          name: 'Range',
          path: '/template/forms/range'
        },
        {
          name: 'Textarea',
          path: '/template/forms/textarea'
        }
      ]
    },
    {
      name: 'Pages',
      separator: true,
      submenu: [
        {
          name: 'Signup',
          path: '/template/pages/signup'
        }
      ]
    },
    {
      name: 'unocss.dev',
      link: 'https://unocss.dev/'
    },
    {
      name: 'fontawesome.com',
      link: 'https://fontawesome.com/search'
    },
    {
      name: 'iconify.design',
      link: 'https://icon-sets.iconify.design'
    },
    {
      name: 'icones',
      link: 'https://icones.js.org/'
    },
    {
      name: 'undraw.co',
      link: 'https://undraw.co/illustrations'
    },
    {
      name: 'vuejs.org',
      link: 'https://vuejs.org/'
    },
    {
      name: 'vitejs.dev',
      link: 'https://vitejs.dev/'
    }
  ]
}
