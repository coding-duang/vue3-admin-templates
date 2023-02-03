import { defineStore } from 'pinia'
import { GlobalThemeOverrides } from 'naive-ui'
import { themeOverrides, ThemeType } from '@/config/theme'

type State = {
  currentTheme: GlobalThemeOverrides
}

export const useThemeStore: import('pinia').StoreDefinition = defineStore(
  'theme',
  {
    state: () => ({
      currentTheme: themeOverrides.greenWhiteTheme,
    }),
    getters: {
      getCurrentTheme: (state: State) => state.currentTheme,
    },
    actions: {
      setTheme(key: ThemeType) {
        this.currentTheme = themeOverrides[key]
      },
    },
  }
)
