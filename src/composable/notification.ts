import { useNotification } from '@kyvg/vue3-notification'

export enum TypesEnum {
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
  Danger = 'danger'
}

export interface OptionInterface {
  type?: TypesEnum
  group?: string
  duration?: number
}

export function useBaseNotification() {
  const { notify } = useNotification()

  const notification = (title: string, text: string, options?: OptionInterface) => {
    notify({
      title: title,
      text: text,
      type: options?.type,
      group: options?.group,
      duration: options?.duration ?? 3000
    })
  }

  return { notification }
}
