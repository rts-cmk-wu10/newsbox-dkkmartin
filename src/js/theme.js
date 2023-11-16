/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2023 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

;(() => {
  'use strict'

  const getStoredTheme = () => localStorage.getItem('theme')
  const setStoredTheme = (theme) => localStorage.setItem('theme', theme)

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme()
    if (storedTheme) {
      return storedTheme
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const setTheme = (theme) => {
    if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-bs-theme', 'dark')
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme)
    }
  }

  setTheme(getPreferredTheme())

  const showActiveTheme = (theme, focus = false) => {
    const themeSwitcher = document.querySelector('#toggleDarkModeButton')
    if (!themeSwitcher) {
      return
    }

    themeSwitcher.setAttribute('data-bs-theme-value', theme)
    themeSwitcher.textContent = `Toggle ${theme === 'dark' ? 'Light' : 'Dark'} Mode`

    if (focus) {
      themeSwitcher.focus()
    }
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const storedTheme = getStoredTheme()
    if (storedTheme !== 'light' && storedTheme !== 'dark') {
      setTheme(getPreferredTheme())
    }
  })

  window.addEventListener('DOMContentLoaded', () => {
    showActiveTheme(getPreferredTheme())

    const toggleDarkModeButton = document.getElementById('toggleDarkModeButton')
    if (toggleDarkModeButton) {
      toggleDarkModeButton.addEventListener('click', () => {
        const currentTheme = toggleDarkModeButton.getAttribute('data-bs-theme-value')
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark'

        setStoredTheme(newTheme)
        setTheme(newTheme)
        showActiveTheme(newTheme, true)
      })
    }
  })
})()
