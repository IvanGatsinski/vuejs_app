import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/home/Home'
import CreateProduct from './components/createProduct/Form'
import EditProduct from './components/editProduct/Form'
import ProductDetails from './components/details/productDetails'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import MyProfile from './components/user/MyProfile'
import store from './store/index'

Vue.use(VueRouter)

const routes = [
    { path: '/', component: Home },
    { path: '/register', component: Register },
    { path: '/login', component: Login },
    { path: '/myProfile', component: MyProfile},
    { path: '/product/create', component: CreateProduct },
    { path: '/product/edit/:id', component: EditProduct },
    { path: '/product/details/:id', component: ProductDetails },
    { path: '*', redirect: '/login' }
]

const router = new VueRouter({
    routes,
    mode: 'history'
}) 

router.beforeEach((to, from, next) => {
    store.dispatch('user/getSession')
    const authtoken = store.state.user.authtoken

    if (to.fullPath === '/login' || to.fullPath === '/register') {
      if (authtoken) {
        next('/');
      }
    }
    else {
      if (!authtoken) {
        next('/login');
      }
    }
    next()
  })
  
export default router