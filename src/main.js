import Vue from 'vue'
import App from './App.vue'
import NProgress from 'vue-nprogress'
import router from './router'
import store from './store/index'
import axios from 'axios'
import * as progress from 'nprogress'
import vuetify from './plugins/vuetify';
import VTooltip from 'v-tooltip'  

axios.defaults.baseURL = 'https://baas.kinvey.com';
// before a request is made start the nprogress

axios.interceptors.request.use(config => {

  progress.start()
  return config
}, error => {
  progress.done()
  return Promise.reject(error);
})

// before a response is returned stop nprogress
axios.interceptors.response.use(response => {
  progress.done()

  return response
}, error => {
  console.log(error);
  
  progress.done()
  return Promise.reject(error);
})

Vue.use(NProgress)
Vue.use(VTooltip)
const nprogress = new NProgress()

Vue.config.productionTip = false

new Vue({
  nprogress,
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
