import auth from './modules/auth/index'
import products from './modules/products/index'
import user from './modules/user/index'
import * as rootTypes from './modules/rootTypes'
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
        hasSuccess: false,
        errorMessage: '',
        successMessage: '',
    },
    mutations: {
        [rootTypes.SHOW_ERROR_MESSAGE] (state) {
            state.hasError = true
        },
        [rootTypes.HIDE_ERROR_MESSAGE] (state) {
            state.hasError = false
        },
        [rootTypes.SET_ERROR_MESSAGE] (state, message) {
            state.errorMessage = message
        },
        [rootTypes.SHOW_SUCCESS_MESSAGE] (state) {
            state.hasSuccess = true
        },
        [rootTypes.HIDE_SUCCESS_MESSAGE] (state) {
            state.hasSuccess = false
        },
        [rootTypes.SET_SUCCESS_MESSAGE] (state, message) {
            state.successMessage = message
        }
    },
    actions: {
        showError({ commit }) {
            commit(rootTypes.SHOW_ERROR_MESSAGE)
            setTimeout(() => commit(rootTypes.HIDE_ERROR_MESSAGE) ,3000)
        },
        hideError({ commit }) {
            commit(rootTypes.HIDE_ERROR_MESSAGE)
        },
        setErrorMessage({ commit }, message) {
            commit(rootTypes.SET_ERROR_MESSAGE, message)
        },
        showSuccess({ commit }) {
            commit(rootTypes.SHOW_SUCCESS_MESSAGE)
            setTimeout(() => commit(rootTypes.HIDE_SUCCESS_MESSAGE) ,3000)
        },
        hideSuccess({ commit }) {
            commit(rootTypes.HIDE_SUCCESS_MESSAGE)
        },
        setSuccessMessage({ commit }, message) {
            commit(rootTypes.SET_SUCCESS_MESSAGE, message)
        }
    }
}

export default new Vuex.Store(store)