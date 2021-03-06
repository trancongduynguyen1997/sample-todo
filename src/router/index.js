import Vue from 'vue'
import VueRouter from 'vue-router'
import TodoPage from '../views/TodoPage.vue'
import Dashboard from '../views/Dashboard.vue'
import RegisterUser from "../components/RegisterUser.vue"

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'TodoPage',
    component: TodoPage
  },
  {
    path: '/dashboard',
    name: 'DashBoard',
    component: Dashboard
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterUser
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
