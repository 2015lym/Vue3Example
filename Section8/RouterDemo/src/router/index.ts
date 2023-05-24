import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { ElMessage } from 'element-plus'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/userlist',
      name: 'userlist',
      component: () => import('../views/UserList.vue')
    },
    {
      path: '/userinfo',
      name: 'userinfo',
      component: () => import('../views/UserInfo.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const username = localStorage.getItem('username')
  if (!username && to.fullPath == '/userinfo') {
    ElMessage.error('你还没有登录，请先登录')
    next('/login')
  } else {
    next();
  }
})

router.beforeResolve((to, from, next) => {
  console.log('开始解析了')
  next();
})

router.afterEach((to, from) => {
  console.log('后置守卫生效')
  console.log(`Navigated to ${to.fullPath} from ${from.fullPath}`)
})

export default router
