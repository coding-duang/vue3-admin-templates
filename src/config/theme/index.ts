import { ref } from 'vue'
import { GlobalThemeOverrides } from 'naive-ui'

export type AllThemes = {
  blueWhiteTheme?: GlobalThemeOverrides
  blackWhiteTheme?: GlobalThemeOverrides
}

export type ThemeType = keyof AllThemes

export const themeOverrides: AllThemes = {
  blueWhiteTheme: {
    Button: {
      // colorPrimary: '#e4393c',
      // textColor: '#e4393c',
    },
  },
  blackWhiteTheme: {
    Button: {
      colorPrimary: '#000',
    },
  },
}

export const getCurrentTheme = (type: ThemeType = 'blueWhiteTheme') => {
  const currentTheme = ref<GlobalThemeOverrides>(null)

  currentTheme.value = themeOverrides[type]

  return {
    currentTheme,
  }
}
