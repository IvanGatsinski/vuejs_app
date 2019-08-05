import router from '../../router'
import { authenticateUser, logoutUser } from '../../api_calls/auth'
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
            repeatPassword: '',
            city: '',
            age: null,
            phone: null,
            gender: '',
        }
    },
    getters: {
        getField,
    },
    mutations: {
        updateField,
        clearLoginFields(state) {
            state.loginForm.username = ''
            state.loginForm.password = ''
        },
        clearRegisterFields(state) {
            state.registerForm.username = ''
            state.registerForm.password = ''
            state.registerForm.repeatPassword = ''
            state.registerForm.city = ''
            state.registerForm.age = null
            state.registerForm.phone = null
            state.registerForm.gender = ''
        },
    },
    actions: {
        authenticate({ dispatch, commit }, user_data) {
            authenticateUser({...user_data})
                .then(res => {
                    const RESPONSE_DATA = res.data
                    console.log(user_data);
                    
                    dispatch('user/saveSession', RESPONSE_DATA, { root : true })
                    user_data.authType === 'login' ?
                    commit('clearLoginFields') : commit('clearRegisterFields')
                })
        },
        logout({ dispatch }) {
            dispatch('user/clearSession', null, { root : true })
        },
    }
}

export default auth