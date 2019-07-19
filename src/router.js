import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from './components/Welcome'
import Dashboard from './components/Dashboard'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import store from './store'

Vue.use(VueRouter)

const routes = [
    { path: '/', component: Welcome },
    { path: '/register', component: Register },
    { path: '/login', component: Login },
    { path: '/dashboard', component: Dashboard },
    { path: '*', redirect: '/login' }
]

const router = new VueRouter({
    routes,
    mode: 'history'
}) 

router.beforeEach((to, from, next) => {
    store.dispatch('getToken')
  
    if (to.fullPath === '/login' || to.fullPath === '/register') {
      if (store.state.authToken) {
        next('/');
      }
    }
    else {
      if (!store.state.authToken) {
        next('/login');
      }
    }
    next()
  })
  
export default router