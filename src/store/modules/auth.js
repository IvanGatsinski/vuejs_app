import { authenticateUser } from '../../api_calls/auth'
import { getField, updateField } from 'vuex-map-fields'

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
            birthdayYears: null,
            email: '',
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
    },
    actions: {
        authenticate({ dispatch, commit }, user_data) {
            authenticateUser({...user_data})
                .then(res => {
                    const RESPONSE_DATA = res.data
                    console.log(user_data);
                    
                    dispatch('user/saveSession', RESPONSE_DATA, { root : true })
                })
        },
        logout({ dispatch }) {
            dispatch('user/clearSession', null, { root : true })
        },
    }
}

export default auth