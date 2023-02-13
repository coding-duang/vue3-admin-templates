import { ThemeType } from '@/config/theme'

export type ColorChooseSet = {
  color: string
  themeType: ThemeType
}

export const colorChooseSettings: ColorChooseSet[] = [
  {
    color: '#18a058',
    themeType: 'greenWhiteTheme',
  },
  {
    color: '#2080f0',
    themeType: 'blueWhiteTheme',
  },
  {
    color: '#d03050',
    themeType: 'redWhiteTheme',
  },
  {
    color: 'rgba(207, 36, 213, 1)',
    themeType: 'purpleWhiteTheme',
  },
]

export const selectOptions = [
  {
    label: '已废弃',
    value: 0,
  },
  {
    label: '已发布',
    value: 1,
  },
  {
    label: '未发布',
    value: 2,
  },
  {
    label: '其他',
    value: 3,
  },
]
