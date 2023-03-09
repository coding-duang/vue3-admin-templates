import { defineComponent, PropType } from 'vue'
import { NCard } from 'naive-ui'
import styles from './index.module.scss'

export type TechnicalItemType = {
  name: string
  desc: string
  version: string
  url: string
  icon?: string
}

const TechnicalData: TechnicalItemType[] = [
  {
    name: 'Vue3',
    desc: '渐进式JavaScript框架',
    version: '3.2.45',
    url: 'https://cn.vuejs.org/'
  },
  {
    name: 'TypeScript',
    desc: 'TypeScript 是一种基于 JavaScript 构建的强类型编程语言，可为您提供任何规模的更好工具',
    version: '4.9.5',
    url: 'https://www.typescriptlang.org/zh/'
  },
  {
    name: 'vite',
    desc: '下一代前端开发与构建工具',
    version: '4.0.4',
    url: 'https://www.vitejs.net/'
  },
  {
    name: 'pinia',
    desc: '符合直觉的Vue.js状态管理库',
    version: '2.0.29',
    url: 'https://pinia.vuejs.org/zh/'
  },
  {
    name: 'naive-ui',
    desc: '完整，主题可调，使用TypeScript的vue3的UI组件库',
    version: '2.34.3',
    url: 'https://www.naiveui.com/zh-CN'
  },
  {
    name: 'sass',
    desc: '世界上最成熟、最稳定、最强大的专业级 CSS扩展语言',
    version: '1.58.0',
    url: 'https://sass-lang.com/documentation/'
  }
]

const readSVG = (): TechnicalItemType[] => {
  const modules = import.meta.glob('@/assets/dashboard/**/*.svg', { eager: true })
  const icons = Object.values(modules)
  return TechnicalData.map((item: TechnicalItemType, index: number) => {
    return {
      icon: (icons[index] as any).default as string,
      ...item
    }
  })
}

export const TechnicalSelection = defineComponent({
  name: 'TechnicalSelection',
  setup() {
    const data = readSVG()

    return () => <NCard title='技术栈' hoverable>
        <div class={ styles.technical }>
          { data.map((d: TechnicalItemType, index: number) => <div onClick={() => window.open(d.url)} class={ styles.item }>
            <NCard hoverable>
              <TechnicalItem data={ d } index={ index } />
            </NCard>
          </div>) }
        </div>
    </NCard>
  }
})

const TechnicalItem = defineComponent({
  name: 'TechnicalItem',
  props: {
    data: {
      type: Object as PropType<TechnicalItemType>,
      default: () => ({})
    },
    index: {
      type: Number
    }
  },
  setup(props) {
    return () => <div class={ styles.technicalItem }>
      <div class={ styles.iconBox }>
        <div class={ [styles.imageBg, styles[`bg${props.index + 1}`]] }></div>
        <img src={ props.data.icon! } alt="icon" class={ styles.icon } />
      </div>
      <div class={ styles.content }>
        <div class={ [styles.name, styles[`text${props.index + 1}`]]}>{ props.data.name }</div>
        <div class={ styles.desc }>{ props.data.desc }</div>
        <div class={ styles.version }>使用版本: { props.data.version }</div>
      </div>
    </div>
  }
})
