interface IApps {
  name: string
  path: string
  icon?: string
  menu?: IMenu[]
}

interface IMenu {
  name: string
  path?: string
  separator?: boolean
  submenu?: ISubmenu[]
}

interface ISubmenu {
  name: string
  path: string
  separator?: boolean
}
