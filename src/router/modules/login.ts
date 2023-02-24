import { RouteRecordRaw } from 'vue-router'
import Login from '@/pages/Login/index.vue'

const BASE_ROUTE = 'Login'

const LoginRoutes: RouteRecordRaw[] = [
  {
    path: `/${BASE_ROUTE}`,
    name: BASE_ROUTE,
    component: Login,
    meta: {
      title: '登录',
    },
    children: [
      {
        path: 'print',
        name: `${BASE_ROUTE}_print`,
        component: () => import('@/pages/Tools/Print/index.vue'),
        meta: {
          title: '打印',
        },
      },
    ],
  },
]

export default LoginRoutes
