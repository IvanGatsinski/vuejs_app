import router from '../../router'
import { loginUser, registerUser, logoutUser } from '../../api_calls/auth'
import { getField, updateField } from 'vuex-map-fields'

const auth = {
    namespaced: true,
    state: {
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
    },
    actions: {
        register({ dispatch }, USER_DATA) {
            registerUser(USER_DATA)
                .then(res => {
                    const RESPONSE_DATA = res.data

                    dispatch('user/saveSession', RESPONSE_DATA, { root : true })
                })
        },
        login({ dispatch }, USER_DATA) {
            loginUser(USER_DATA)
                .then(res => {
                    const RESPONSE_DATA = res.data

                    dispatch('user/saveSession', RESPONSE_DATA, { root : true })
                })
                .catch(err => { console.warn(err) });
        },
        logout({ dispatch }) {
            dispatch('user/clearSession', null, { root : true })
        },
    }
}

export default auth