import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          name: 'dashboard',
          path: '/',
          component: () => import('../views/Dashboard.vue')
        },
        {
          name: 'profile',
          path: '/Profile',
          component: () => import('../views/Profile.vue')
        },
        {
          name: 'params',
          path: '/Params/',
          component: () => import('../views/ParamsView.vue')
        },
        {
          name: 'query',
          path: '/Query',
          component: () => import('../views/QueryView.vue')
        }
      ]
    },
    {
      path: '/about/:id',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  // to: 即将要进入的目标路由对象
  console.log(to)
  // from: 当前导航正要离开的路由对象
  console.log(from)
  // next: 必须被调用才能进入下一个钩子，否则路由不会切换
  next();
})

router.beforeResolve((to, from, next) => {
  // 在路由解析组件之前执行一些操作
  console.log('开始解析了')
  console.log(`Navigated to ${to.fullPath} from ${from.fullPath}`)
  next();
})

router.afterEach((to, from) => {
  console.log('后置守卫生效')
  console.log(`Navigated to ${to.fullPath} from ${from.fullPath}`)
})
export default router
