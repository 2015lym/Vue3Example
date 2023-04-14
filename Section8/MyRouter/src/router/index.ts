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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
