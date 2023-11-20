import { createRouter, createWebHashHistory } from 'vue-router'

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

export const routes = [...constantRoutes]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

export default router
