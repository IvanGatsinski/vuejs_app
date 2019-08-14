import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify, {
  theme: {
    primary: '#FFF'
  }
});

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
});
