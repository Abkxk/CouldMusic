import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store/index.js'
const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/Index.vue')
  },
  {
    path: '/itemmusic',
    name: 'ItemMusic',
    component: () => import('@/views/ItemMusic.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/Search.vue')
  },
  // {
  //   path: '/userinfo',
  //   name: 'Userinfo',
  //   // 路由守卫
  //   beforeEnter: (to, from, next) => {
  //     // 本应该加上：|| localStorage.setItem('token') 但会报错：使用sessionStorage超过大小限制
  //     if (store.state.isLogin || store.state.token) {
  //       next()
  //     } else {
  //       next('/login')
  //     }
  //   },
  //   component: () => import('@/views/Userinfo.vue')
  // },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
// 全局路由，登陆页面不显示播放组件
router.beforeEach((to, from) => {
  if (to.path === '/login') {
    store.state.isFooterMusicShow = false
  } else {
    store.state.isFooterMusicShow = true
  }
})
export default router
