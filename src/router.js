import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/index'
import * as progress from 'nprogress'
import Home from './components/home/Home'
import CreateProduct from './components/createProduct/Form'
import EditProduct from './components/editProduct/Form'
import ProductDetails from './components/details/productDetails'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import EditUserInfo from './components/user/editUserInfo/Form'
import UserDetails from './components/userDetails/UserDetails'
import UserProductsList from './components/userDetails/UserProductsList'
import Cart from './components/cart/Cart'


Vue.use(VueRouter)

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/register', name: 'register', component: Register },
    { path: '/login', name: 'login', component: Login },
    { path: '/cart', name: 'cart', component: Cart},
    { path: '/user/details/:id', name: 'userDetails', component: UserDetails, 
      children: [
      { path: 'edit', name: 'editMyProfile', component: EditUserInfo },
      { path: 'products', name: 'userProducts', component: UserProductsList },
    ]},
    { path: '/product/create', name: 'createProduct', component: CreateProduct },
    { path: '/product/edit/:id', name: 'editProduct', component: EditProduct },
    { path: '/product/details/:id', name: 'productDetails', component: ProductDetails },
    { path: '*', redirect: '/' }
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

router.beforeResolve((to, from, next) => {
  if (to.name) {
    progress.start()
  }
  next()
})

router.afterEach((to, from) => {
  progress.done()
})
export default router