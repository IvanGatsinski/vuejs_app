import auth from './modules/auth/index'
import products from './modules/products/index'
import user from './modules/user/index'
import { SHOW_ERROR_MESSAGE, HIDE_ERROR_MESSAGE, SET_ERROR_MESSAGE } from './modules/rootTypes'
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
        hasError: false,
        errorMessage: '',
    },
    mutations: {
        [SHOW_ERROR_MESSAGE] (state) {
            state.hasError = true
        },
        [HIDE_ERROR_MESSAGE] (state) {
            state.hasError = false
        },
        [SET_ERROR_MESSAGE] (state, message) {
            state.errorMessage = message
        }
    },
    actions: {
        showError({ commit }) {
            commit(SHOW_ERROR_MESSAGE)
            setTimeout(() => commit(HIDE_ERROR_MESSAGE) ,3000)
        },
        hideError({ commit }) {
            commit(HIDE_ERROR_MESSAGE)
        },
        setErrorMessage({ commit }, message) {
            commit(SET_ERROR_MESSAGE, message)
        }
    }
}

export default new Vuex.Store(store)