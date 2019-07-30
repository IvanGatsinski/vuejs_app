import Vue from 'vue'
import App from './App.vue'
import NProgress from 'vue-nprogress'
import router from './router'
import store from './store/index'
import axios from 'axios'
import * as progress from 'nprogress'
import vuetify from './plugins/vuetify';

axios.defaults.baseURL = 'https://baas.kinvey.com';
// before a request is made start the nprogress
axios.interceptors.request.use(config => {
  progress.start()
  return config
})

// before a response is returned stop nprogress
axios.interceptors.response.use(response => {
  progress.done()
  return response
})



Vue.use(NProgress)
const nprogress = new NProgress()

Vue.config.productionTip = false

new Vue({
  nprogress,
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
