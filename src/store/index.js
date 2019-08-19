import auth from './modules/auth'
import products from './modules/products'
import user from './modules/user'
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = {
    modules: {
        auth,
        products,
        user,
    },
    state: {
        isLoading: false,
    },
    getters: {
        loading: state => isLoading => {
            return isLoading
        }
    },
    mutations: {
        enableLoading(state) {
            state.isLoading = true
        },
        disableLoading(state) {
            state.isLoading = false
        }
    },
    actions: {
        enableLoading({ commit }) {
            commit('enableLoading')
        },
        disableLoading({ commit }) {
            commit('disableLoading')
        }
    }
}

export default new Vuex.Store(store)