import auth from './modules/auth'
import products from './modules/products'
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = {
    modules: {
        auth,
        products,
    }
}

export default new Vuex.Store(store)