import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { Layout, getParentLayout } from '@/utils/routerHelper'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

export const constantRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/asset/AssetOverview',
    name: 'Root',
    meta: {
      hidden: true
    }
  },
  {
    path: '/login',
    component: () => import('@/views/Login/Login.vue'),
    name: 'Login',
    meta: {
      hidden: true,
      title: t('router.login'),
      noTagsView: true
    }
  },
  {
    path: '/404',
    component: () => import('@/views/Error/404.vue'),
    name: 'NoFind',
    meta: {
      hidden: true,
      title: '404',
      noTagsView: true
    }
  }
]

export const asyncRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/Asset',
    component: Layout,
    redirect: '/Asset/AssetOverview',
    name: 'Asset',
    meta: {
      title: '资产盘点',
      icon: 'ant-design:dashboard-filled',
      alwaysShow: true
    },
    children: [
      {
        path: 'AssetOverview',
        component: () => import('@/views/Asset/AssetOverview.vue'),
        name: 'AssetOverview',
        meta: {
          title: '资产概况',
          noCache: true,
          affix: true
        }
      },
      {
        path: 'DataAnalysis',
        component: () => import('@/views/Asset/DataAnalysis.vue'),
        name: 'DataAnalysis',
        meta: {
          title: '数据分析',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/Product',
    component: Layout,
    redirect: '/Product/ProductSearch',
    name: 'Product',
    meta: {
      title: '商品管理',
      icon: 'bx:bxs-component',
      alwaysShow: true
    },
    children: [
      {
        path: 'ProductSearch',
        component: () => import('@/views/Product/ProductSearch.vue'),
        name: 'ProductSearch',
        meta: {
          title: '商品查询',
          noCache: true
        }
      },
      {
        path: 'ProductAdd',
        component: () => import('@/views/Product/ProductAdd.vue'),
        name: 'ProductAdd',
        meta: {
          title: '商品添加',
          noCache: true
        }
      },
      {
        path: 'ProductEdit',
        component: () => import('@/views/Product/ProductEdit.vue'),
        name: 'ProductEdit',
        meta: {
          title: '商品编辑',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/Order',
    component: Layout,
    redirect: '/Order/OrderSearch',
    name: 'Order',
    meta: {
      title: '订单管理',
      icon: 'clarity:document-solid',
      alwaysShow: true
    },
    children: [
      {
        path: 'OrderSearch',
        component: () => import('@/views/Order/OrderSearch.vue'),
        name: 'OrderSearch',
        meta: {
          title: '订单查询',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/Inventory',
    component: Layout,
    redirect: '/Inventory/InventorySearch',
    name: 'Inventory',
    meta: {
      title: '库存管理',
      icon: 'carbon:skill-level-advanced',
      alwaysShow: true
    },
    children: [
      {
        path: 'InventorySearch',
        component: () => import('@/views/Inventory/InventorySearch.vue'),
        name: 'InventorySearch',
        meta: {
          title: '库存查询',
          noCache: true
        }
      },
      {
        path: 'InventoryEdit',
        component: () => import('@/views/Inventory/InventoryEdit.vue'),
        name: 'InventoryEdit',
        meta: {
          title: '库存编辑',
          noCache: true
        }
      },
    ]
  },
  {
    path: '/User',
    component: Layout,
    redirect: '/User/PermissionManagement',
    name: 'User',
    meta: {
      title: '用户管理',
      icon: 'eos-icons:role-binding',
      alwaysShow: true
    },
    children: [
      {
        path: 'PermissionManagement',
        component: () => import('@/views/User/PermissionManagement.vue'),
        name: 'PermissionManagement',
        meta: {
          title: '权限管理',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/Message',
    component: Layout,
    redirect: '/Message/MessageManagement',
    name: 'Message',
    meta: {
      title: '消息管理',
      icon: 'cib:telegram-plane',
      alwaysShow: true
    },
    children: [
      {
        path: 'MessageManagement',
        component: () => import('@/views/Message/MessageManagement.vue'),
        name: 'MessageManagement',
        meta: {
          title: '消息分类管理',
          noCache: true
        }
      },
      {
        path: 'FeedbackManagement',
        component: () => import('@/views/Message/FeedbackManagement.vue'),
        name: 'FeedbackManagement',
        meta: {
          title: '意见反馈管理',
          noCache: true
        }
      }
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes: constantRouterMap as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export const resetRouter = (): void => {
  const resetWhiteNameList = ['Redirect', 'Login', 'NoFind', 'Root']
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !resetWhiteNameList.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export const setupRouter = (app: App<Element>) => {
  app.use(router)
}

export default router
