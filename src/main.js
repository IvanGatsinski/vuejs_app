import Vue from 'vue'
import App from './App.vue'
import NProgress from 'vue-nprogress'
import router from './router'
import store from './store/index'
import wait from './wait'
import vuetify from './plugins/vuetify';
import GlobalComponents from './global_components'

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
