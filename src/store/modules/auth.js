import router from '../../router'
import { loginUser, registerUser, logoutUser } from '../../api_calls/auth'
import { getField, updateField } from 'vuex-map-fields'

const auth = {
    namespaced: true,
    state: {
        username: '',
        userId: null,
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
            localStorage.removeItem('username')
            localStorage.removeItem('userId')
            state.authToken = null
            state.userId = null
        },
        saveSession(state, response_data) {
            console.log(response_data)
            const { username, _id, } = response_data

            localStorage.setItem('token', response_data._kmd.authtoken)
            localStorage.setItem('username', username)
            localStorage.setItem('userId', _id)
            
            state.authToken = response_data._kmd.authtoken
            state.username = username
            state.userId = _id
        },
        getToken(state) {
            state.authToken = localStorage.getItem('token')
            state.username = localStorage.getItem('username')
            state.userId = localStorage.getItem('userId')
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

export default auth