import { ref } from 'vue'
import { GlobalThemeOverrides } from 'naive-ui'

export type AllThemes = {
  greenWhiteTheme?: GlobalThemeOverrides
  blueWhiteTheme?: GlobalThemeOverrides
  redWhiteTheme?: GlobalThemeOverrides
  purpleWhiteTheme?: GlobalThemeOverrides
}

export type ThemeType = keyof AllThemes

export const themeOverrides: AllThemes = {
  greenWhiteTheme: {
    common: {
      primaryColor: '#18a058',
      primaryColorHover: '#36ad6a',
      primaryColorPressed: '#0c7a43',
    },
  },
  blueWhiteTheme: {
    common: {
      primaryColor: '#2080f0',
      primaryColorHover: '#4098fc',
      primaryColorPressed: '#1060c9',
    },
  },
  redWhiteTheme: {
    common: {
      primaryColor: '#d03050',
      primaryColorHover: '#de576d',
      primaryColorPressed: '#ab1f3f',
    },
  },
  purpleWhiteTheme: {
    common: {
      primaryColor: 'rgba(207, 36, 213, 1)',
      primaryColorHover: 'rgba(207, 36, 213, .5)',
      primaryColorPressed: 'rgba(207, 36, 200, 1)',
    },
  },
}
