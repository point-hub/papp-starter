export const routes = {
  path: '/template',
  component: () => import('@/layouts/app/app-index.vue'),
  children: [
    {
      path: '',
      children: [
        {
          path: '',
          component: () => import('./views/page-index.vue')
        }
      ]
    },
    {
      path: 'components',
      children: [
        {
          path: '',
          component: () => import('./views/components/page-index.vue')
        },
        {
          path: 'accordion',
          component: () => import('./views/components/accordion/page-accordion.vue')
        },
        {
          path: 'alert',
          component: () => import('./views/components/alert/page-alert.vue')
        },
        {
          path: 'avatar',
          component: () => import('./views/components/avatar/page-avatar.vue')
        },
        {
          path: 'badge',
          component: () => import('./views/components/badge/page-badge.vue')
        },
        {
          path: 'breadcrumb',
          component: () => import('./views/components/breadcrumb/page-breadcrumb.vue')
        },
        {
          path: 'button',
          component: () => import('./views/components/button/page-button.vue')
        },
        {
          path: 'button-group',
          component: () => import('./views/components/button-group/page-button-group.vue')
        },
        {
          path: 'card',
          component: () => import('./views/components/card/page-card.vue')
        },
        {
          path: 'collapse',
          component: () => import('./views/components/collapse/page-collapse.vue')
        },
        {
          path: 'divider',
          component: () => import('./views/components/divider/page-divider.vue')
        },
        {
          path: 'dropdown',
          component: () => import('./views/components/dropdown/page-dropdown.vue')
        },
        {
          path: 'mask',
          component: () => import('./views/components/mask/page-mask.vue')
        },
        {
          path: 'modal',
          component: () => import('./views/components/modal/page-modal.vue')
        },
        {
          path: 'notification',
          component: () => import('./views/components/notification/page-notification.vue')
        },
        {
          path: 'popover',
          component: () => import('./views/components/popover/page-popover.vue')
        },
        {
          path: 'progress',
          component: () => import('./views/components/progress/page-progress.vue')
        },
        {
          path: 'skeleton',
          component: () => import('./views/components/skeleton/page-skeleton.vue')
        },
        {
          path: 'spinner',
          component: () => import('./views/components/spinner/page-spinner.vue')
        },
        {
          path: 'starter',
          component: () => import('./views/components/starter/page-starter.vue')
        },
        {
          path: 'steps',
          component: () => import('./views/components/steps/page-steps.vue')
        },
        {
          path: 'table',
          component: () => import('./views/components/table/page-table.vue')
        },
        {
          path: 'table-advance',
          component: () => import('./views/components/table-advance/page-table-advance.vue')
        },
        {
          path: 'tabs',
          component: () => import('./views/components/tabs/page-tabs.vue')
        },
        {
          path: 'timeline',
          component: () => import('./views/components/timeline/page-timeline.vue')
        },
        {
          path: 'tooltip',
          component: () => import('./views/components/tooltip/page-tooltip.vue')
        },
        {
          path: 'treeview',
          component: () => import('./views/components/treeview/page-treeview.vue')
        },
        {
          path: 'typography',
          component: () => import('./views/components/typography/page-typography.vue')
        }
      ]
    },
    {
      path: 'forms',
      children: [
        {
          path: '',
          component: () => import('./views/forms/page-index.vue')
        },
        {
          path: 'autocomplete',
          component: () => import('./views/forms/autocomplete/page-autocomplete.vue')
        },
        {
          path: 'checkbox',
          component: () => import('./views/forms/checkbox/page-checkbox.vue')
        },
        {
          path: 'datepicker',
          component: () => import('./views/forms/datepicker/page-datepicker.vue')
        },
        {
          path: 'input-group',
          component: () => import('./views/forms/input-group/page-input-group.vue')
        },
        {
          path: 'input-mask',
          component: () => import('./views/forms/input-mask/page-input-mask.vue')
        },
        {
          path: 'input-text',
          component: () => import('./views/forms/input-text/page-input-text.vue')
        },
        {
          path: 'radio',
          component: () => import('./views/forms/radio/page-radio.vue')
        },
        {
          path: 'radio-group',
          component: () => import('./views/forms/radio-group/page-radio-group.vue')
        },
        {
          path: 'range',
          component: () => import('./views/forms/range/page-range.vue')
        },
        {
          path: 'select',
          component: () => import('./views/forms/select/page-select.vue')
        },
        {
          path: 'switch',
          component: () => import('./views/forms/switch/page-switch.vue')
        },
        {
          path: 'textarea',
          component: () => import('./views/forms/textarea/page-textarea.vue')
        },
        {
          path: 'file-upload',
          component: () => import('./views/forms/file-upload/page-file-upload.vue')
        }
      ]
    },
    {
      path: 'pages',
      children: [
        {
          path: '',
          component: () => import('./views/pages/page-index.vue')
        },
        {
          path: 'signup',
          component: () => import('./views/pages/page-signup.vue')
        }
      ]
    }
  ]
}
