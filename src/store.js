import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import { loginUser, registerUser, logoutUser } from './api_calls/auth'
import { getField, updateField } from 'vuex-map-fields'

Vue.use(Vuex)

const store = {
    state: {
        username: '',
        authToken: null,
        loginForm: {
            username: '',
            password: '',
        },
        registerForm: {
            username: '',
            password: '',
        }
    },
    getters: {
        getField,
    },
    mutations: {
        updateField,
        logout(state) {
            localStorage.removeItem('token')
            state.authToken = null
        },
        saveSession(state, response_data) {
            localStorage.setItem('token', response_data._kmd.authtoken)
            localStorage.setItem('username', response_data.username)

            state.authToken = response_data._kmd.authtoken
            state.username = response_data.username
        },
        getToken(state) {
            state.authToken = localStorage.getItem('token')
            state.username = localStorage.getItem('username')
        }
    },
    actions: {
        register({ commit }, USER_DATA) {
            registerUser(USER_DATA)
                .then(res => {
                    const RESPONSE_DATA = res.data

                    commit('saveSession', RESPONSE_DATA)
                    router.push("/")
                })
        },
        login({ commit }, USER_DATA) {
            loginUser(USER_DATA)
                .then(res => {
                    const RESPONSE_DATA = res.data

                    commit('saveSession', RESPONSE_DATA)
                    router.push("/");
                })
                .catch(err => { console.warn(err) });
        },
        logout({ commit, state }) {
            logoutUser()
                .then(res => {
                    commit('logout')
                    router.push("/logout");
                })
                .catch(err => { console.warn(err) })
        },
        saveSession({ commit }, response_data) {
            commit('saveSession', response_data)
        },
        getToken({ commit }) {
            commit('getToken')
        }
    }
}

export default new Vuex.Store(store)