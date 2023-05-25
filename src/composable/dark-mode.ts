export function useDarkMode() {
  if (
    localStorage.getItem('dark-mode') === 'dark' ||
    (!('dark-mode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
