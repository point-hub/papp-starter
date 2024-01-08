export const apps: IApps[] = [
  {
    name: 'App 1A',
    path: '/app1a',
    icon: 'https://assets.pointhub.net/assets/images/logo/primary/icon-rounded.png',
    menu: [
      {
        name: 'Home',
        path: '/app1a/home'
      },
      {
        name: 'API',
        path: '/app1a/api'
      },
      {
        name: 'Websocket',
        path: '/app1a/websocket'
      },
      {
        name: 'Nested',
        submenu: [
          { name: 'Page 1', path: '/app1a/nested/page-1' },
          { name: 'Page 2', path: '/app1a/nested/page-2' }
        ]
      }
    ]
  },
  {
    name: 'App 1B',
    path: '/app1b',
    icon: 'https://assets.pointhub.net/assets/images/logo/primary/icon-rounded.png',
    menu: [
      {
        name: 'Home',
        path: '/app1b/home',
        separator: true
      },
      {
        name: 'unocss.dev',
        path: 'https://unocss.dev/'
      },
      {
        name: 'fontawesome.com',
        path: 'https://fontawesome.com/search'
      },
      {
        name: 'iconify.design',
        path: 'https://icon-sets.iconify.design'
      },
      {
        name: 'icones',
        path: 'https://icones.js.org/'
      },
      {
        name: 'undraw.co',
        path: 'https://undraw.co/illustrations'
      },
      {
        name: 'vuejs.org',
        path: 'https://vuejs.org/'
      },
      {
        name: 'vitejs.dev',
        path: 'https://vitejs.dev/'
      }
    ]
  },
  {
    name: 'App 2',
    path: 'https://www.example.com'
  },
  {
    name: 'App 3',
    path: 'https://www.example.com'
  },
  {
    name: 'App 4',
    path: 'https://www.example.com'
  }
]
