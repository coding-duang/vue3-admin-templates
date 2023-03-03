import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/store'

export const useConfig = () => {
  const { getDarkTheme } = storeToRefs(useThemeStore())

  const init = () => {
    const script = document.createElement('script')
    script.id = 'script'
    script.type = 'text/javascript'
    script.src =
      'https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0'
    document.body.appendChild(script)
  }

  ;(window as any).WIDGET = {
    CONFIG: {
      layout: '2',
      width: '280',
      height: '320',
      background: getDarkTheme.value ? '3' : '1',
      dataColor: 'FFFFFF',
      borderRadius: '4',
      key: '640a2c1818774ae2b302c7e428707258',
    },
  }

  onMounted(() => init())
}
