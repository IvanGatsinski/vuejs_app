import { getField, updateField } from 'vuex-map-fields'
import actions from './actions'

const auth = {
    namespaced: true,
    state : {
        loginForm : {
            valid: false,
            username: '',
            password: '',
        },
        registerForm : {
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
    actions
}

export default auth