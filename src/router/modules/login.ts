import { RouteRecordRaw } from 'vue-router'
import Signup from '@/pages/Login/Signup'
import Signin from '@/pages/Login/Signin'

const LoginRoutes: RouteRecordRaw[] = [
  {
    path: 'sign-in',
    name: '登录',
    component: Signin,
    meta: {
      title: '登录',
    },
  },
  {
    path: 'sign-up',
    name: '注册',
    component: Signup,
    meta: {
      title: '注册',
    },
  },
]

export default LoginRoutes
