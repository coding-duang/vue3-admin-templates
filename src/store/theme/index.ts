import { defineStore } from 'pinia'
import { GlobalThemeOverrides } from 'naive-ui'
import { themeOverrides, ThemeType } from '@/config/theme'

type State = {
  darkTheme: boolean
  currentTheme: GlobalThemeOverrides
}

export const useThemeStore: import('pinia').StoreDefinition = defineStore(
  'theme',
  {
    state: () => ({
      darkTheme: false,
      currentTheme: themeOverrides.greenWhiteTheme,
    }),
    getters: {
      getDarkTheme: (state: State) => state.darkTheme,
      getCurrentTheme: (state: State) => state.currentTheme,
    },
    actions: {
      setTheme(key: ThemeType) {
        this.currentTheme = themeOverrides[key]
        document.body.setAttribute('data-theme', key)
      },
      setDarkTheme() {
        this.darkTheme = !this.darkTheme
        document.body.setAttribute(
          'data-theme',
          this.darkTheme ? 'dark' : 'light'
        )
      },
    },
  }
)
