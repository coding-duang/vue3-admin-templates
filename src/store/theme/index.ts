import { defineStore } from 'pinia'
import { GlobalThemeOverrides } from 'naive-ui'
import { themeOverrides, ThemeType } from '@/config/theme'

type State = {
  darkTheme: boolean
  themeKey: ThemeType
  currentTheme: GlobalThemeOverrides
}

export const useThemeStore: import('pinia').StoreDefinition = defineStore(
  'theme',
  {
    state: (): State => ({
      darkTheme: false,
      themeKey: 'greenWhiteTheme',
      currentTheme: themeOverrides.greenWhiteTheme,
    }),
    getters: {
      getDarkTheme: (state: State) => state.darkTheme,
      getThemeKey: (state: State) => state.themeKey,
      getCurrentTheme: (state: State) => state.currentTheme,
    },
    actions: {
      setTheme(key: ThemeType) {
        this.currentTheme = themeOverrides[key]
        this.themeKey = key
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
