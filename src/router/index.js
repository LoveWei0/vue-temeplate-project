import { createRouter, createWebHashHistory } from 'vue-router'
import SystemRouter from './systemRoutes'

// 动态路由
export const asyncRouter = [SystemRouter]

// 静态路由
const constantRoutes = [
  {
    path: '/',
    name: 'home',
    redirect: '/home',
    meta: {
      hidden: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/Home/index.vue'),
        meta: {
          title: '首页',
          hidden: true,
          affix: true
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login/index.vue'),
    meta: {
      title: '登录',
      isNotLayout: true,
      hidden: true
    }
  }
]

export const routes = [...constantRoutes, ...asyncRouter]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

export default router
