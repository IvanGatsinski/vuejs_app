import { authenticateUser } from '../../api_calls/auth'
import { getField, updateField } from 'vuex-map-fields'
import wait from '../../wait'

const auth = {
    namespaced: true,
    state: {
        loginForm: {
            valid: false,
            username: '',
            password: '',
        },
        registerForm: {
            valid: false,
            username: '',
            password: '',
            confirmPassword: '',
            dateOfBirth: null,
            email: '',
            city: '',
            phone: null,
            gender: '',
        }
    },
    getters: {
        getField,
    },
    mutations: {
        updateField,
    },
    actions: {
        async authenticate({ dispatch }, user_data) {
            try {
                wait.start('loading auth btn')
                let user = await authenticateUser({...user_data})
                wait.end('loading auth btn')
                dispatch('user/saveSession', user.data, { root : true })
            } catch (error) {
                wait.end('loading auth btn')
            }
        },
        logout({ dispatch }) {
            dispatch('user/clearSession', null, { root : true })
        },
    }
}

export default auth