import { authenticateUser } from '../../api_calls/auth'
import { getField, updateField } from 'vuex-map-fields'
import { SET_ERROR_MESSAGE } from '../mutation-types/root'
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
        async authenticate({ dispatch, commit }, user_data) {
            try {
                wait.start('loading auth btn')
                let user = await authenticateUser({...user_data})
                wait.end('loading auth btn')
                
                dispatch('user/saveSession', user.data, { root : true })
            } catch (error) {
                let statusCode = error.message.match(/[0-9]+/)[0]
                switch (statusCode) {
                    case '401':
                        error.message = "Invalid username or password!"
                        break;
                    case '409':
                        error.message = "Username is already taken!"
                        break;
                    default:
                        break;
                }
                
                wait.end('loading auth btn')
                
                commit(SET_ERROR_MESSAGE, error.message, { root : true })
                dispatch('showError', null, { root : true })
            }
        },
        logout({ dispatch }) {
            dispatch('user/clearSession', null, { root : true })
        },
    }
}

export default auth