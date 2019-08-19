import Vue from 'vue'
import App from './App.vue'
import NProgress from 'vue-nprogress'
import router from './router'
import store from './store/index'
import wait from './wait'
import axios from 'axios'
import * as progress from 'nprogress'
import vuetify from './plugins/vuetify';
import GlobalComponents from './global_components'

axios.defaults.baseURL = 'https://baas.kinvey.com';
// before a request is made start the nprogress

axios.interceptors.request.use(config => {

  //progress.start()
  return config
}, error => {
  //progress.done()
  return Promise.reject(error);
})

// before a response is returned stop nprogress
axios.interceptors.response.use(response => {
  //progress.done()

  return response
}, error => {

  return Promise.reject(error);
})

GlobalComponents.forEach(component => {
  Vue.component(component.name, component)
})

Vue.use(NProgress)
const nprogress = new NProgress()
nprogress.configure({ 
  easing: 'ease',
  speed: 1200,
  showSpinner: false,
});
Vue.config.productionTip = false

new Vue({
  nprogress,
  router,
  store,
  vuetify,
  wait,
  render: h => h(App)
}).$mount('#app')
