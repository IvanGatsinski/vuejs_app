import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

axios.defaults.baseURL = 'https://baas.kinvey.com';
// router.beforeEach((to, from, next) => {
//   store.dispatch('getToken')

//   if (to.fullPath === '/login' || to.fullPath === '/register') {
//     if (store.state.authToken) {
//       next('/');
//     }
//   }
//   else {
//     if (!store.state.authToken) {
//       next('/login');
//     }
//   }
//   next()
// })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
