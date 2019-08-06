import router from '../../router'
import { updateUserInfo } from '../../api_calls/user'

const user = {
    namespaced: true,
    state: {
        userProfile: {},
        authtoken: '',
    },
    getters: {
        isAuthor: (state) => (authorId) => {
            return state.userProfile._id === authorId
        },
        isItemInCart: (state) => (itemId) => {
            return state.userProfile.cart.find(item => item === itemId)
        }
    },
    mutations: {
        saveSession(state, response_data) {
            state.userProfile = response_data
            state.authtoken = response_data._kmd.authtoken

            localStorage.setItem('userData', JSON.stringify(response_data))
        },
        getSession(state) {
            const userData = JSON.parse(localStorage.getItem('userData'))

            if (userData) {
                state.userProfile = userData
                state.authtoken = userData._kmd.authtoken
            }
        },
        clearSession(state) {
            localStorage.removeItem('userData')
            state.userProfile = {}
            state.authtoken = ''
            router.push('/login')
        }
    },
    actions: {
        addToCart({ commit, state }, productId) {
            let newProfileObject = { ...state.userProfile }
            let userId = state.userProfile._id

            newProfileObject.cart.push(productId)

            updateUserInfo(userId, newProfileObject)
                .then(res => {
                    commit('saveSession', newProfileObject)
                })
                .catch(err => console.log(err))
        },
        removeFromCart({ commit, state }, productId) {
            let newProfileObject = { ...state.userProfile }
            let userId = state.userProfile._id
            let newCart = newProfileObject.cart.filter(oldProductId => oldProductId !== productId)

            newProfileObject.cart = newCart

            updateUserInfo(userId, newProfileObject)
                .then(res => {
                    commit('saveSession', newProfileObject)
                })
                .catch(err => console.log(err))
        },
        saveSession({ commit }, response_data) {
            commit('saveSession', response_data)
            router.push("/");
        },
        getSession({ commit }) {
            commit('getSession')
        },
        clearSession({ commit }) {
            commit('clearSession')
        }
    }
}

export default user