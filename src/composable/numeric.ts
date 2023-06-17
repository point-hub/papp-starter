export function useNumeric() {
  const format = (value: string | number) => {
    return new Intl.NumberFormat(['en', 'en']).format(Number(value.toString()))
  }

  return {
    format
  }
}
