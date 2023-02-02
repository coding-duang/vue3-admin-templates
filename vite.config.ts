import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import vueJSX from '@vitejs/plugin-vue-jsx'
import path from 'path'
// @ts-ignore
import pxtovw from 'postcss-px-to-viewport-8-plugin'
import { ConfigEnv, defineConfig, loadEnv } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import compressPlugin from 'vite-plugin-compression'

const loadVW = pxtovw({
  unitToConvert: 'px', // 需要转换的单位，默认为"px"
  viewportWidth: 1920, // 设计稿的视口宽度
  unitPrecision: 5, // 单位转换后保留的精度
  propList: ['*'], // 能转化为vw的属性列表
  viewportUnit: 'vw', // 希望使用的视口单位
  fontViewportUnit: 'vw', // 字体使用的视口单位
  selectorBlackList: [], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
  minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
  mediaQuery: false, // 媒体查询里的单位是否需要转换单位
  replace: true, //  是否直接更换属性值，而不添加备用属性
  exclude: [/node_modules/], // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
  include: undefined, // 如果设置了include，那将只有匹配到的文件才会被转换
  landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
  landscapeUnit: 'vw', // 横屏时使用的单位
  landscapeWidth: 1920, // 横屏时使用的视口宽度
})

export default ({ mode }: ConfigEnv) => {
  const isProd = mode !== 'development'
  const { VITE_APP_BASE_URL } = loadEnv(mode, process.cwd())

  return defineConfig({
    base: isProd ? './' : '',
    server: {
      port: 9895,
      host: true,
      proxy: {
        '/api': {
          target: VITE_APP_BASE_URL,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          charset: false,
        },
      },
      postcss: {
        plugins: [
          require('autoprefixer'),
          loadVW,
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: atRule => {
                if (atRule.name === 'charset') {
                  atRule.remove()
                }
              },
            },
          },
        ],
      },
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue', '.json'],
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue'],
      }),
      Components({ resolvers: [NaiveUiResolver()] }),
      vueJSX(),
      legacy({
        targets: ['defaults', 'not IE 11'],
      }),
      compressPlugin({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz',
      }),
    ],
    build: {
      minify: 'terser',
      cssCodeSplit: true,
      sourcemap: false,
      assetsInlineLimit: 4096,
      chunkSizeWarningLimit: 1000,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]',
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString()
            }
          },
        },
      },
    },
  })
}
