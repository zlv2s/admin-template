import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () =>
      import(/* webpackChunkName: "dashboard" */ '../views/Layout')
  }
]

const router = new VueRouter({
  routes
})

export default router
