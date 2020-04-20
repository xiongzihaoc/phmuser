import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/components/Login.vue'),
  },
  {
    path: '/lookInfo',
    name: 'ViewInfo',
    component: () => import('@/components/ViewInfo.vue'),
  },
  {
    path: '/testReport',
    name: 'testReport',
    component: () => import('@/components/TestCard/Test.vue'),
  },
  {
    path: '/testWork',
    name: 'testWork',
    component: () => import('@/components/TestCard/TestWork.vue'),
  },
  {
    path: '/StartTset',
    name: 'StartTset',
    component: () => import('@/components/TestCard/StartTset.vue'),
  },
  {
    path: '/StartTestWrite',
    name: 'StartTestWrite',
    component: () => import('@/components/TestCard/StartTestWrite.vue'),
    meta: {
      keepAlive: true
    }
  },
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router