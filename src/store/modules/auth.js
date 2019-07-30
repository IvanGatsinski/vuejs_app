import router from '../../router'
import { loginUser, registerUser, logoutUser } from '../../api_calls/auth'
import { getField, updateField } from 'vuex-map-fields'

const auth = {
    namespaced: true,
    state: {
        username: '',
        loggedUserId: null,
        authToken: null,
        loginForm: {
            username: '',
            password: '',
        },
        registerForm: {
            username: '',
            password: '',
            age: null,
            phone: null,
            sex: '',
            city: '',
            county: ''
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
            localStorage.removeItem('loggedUserId')
            state.authToken = null
            state.loggedUserId = null
        },
        saveSession(state, response_data) {
            console.log(response_data)
            const { username, _id, } = response_data

            localStorage.setItem('token', response_data._kmd.authtoken)
            localStorage.setItem('username', username)
            localStorage.setItem('loggedUserId', _id)
            
            state.authToken = response_data._kmd.authtoken
            state.username = username
            state.loggedUserId = _id
        },
        getToken(state) {
            state.authToken = localStorage.getItem('token')
            state.username = localStorage.getItem('username')
            state.loggedUserId = localStorage.getItem('loggedUserId')
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
        login({ commit, dispatch }, USER_DATA) {
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
                    router.push("/login");
                })
                .catch(err => { console.warn(err) })
        },
        saveSession({ commit }, response_data) {
            commit('saveSession', response_data)
        },
        getToken({ commit }) {
            commit('getToken')
        },
    }
}

export default auth