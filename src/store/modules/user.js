import router from '../../router'
import { updateUserInfo } from '../../api_calls/user'
import { fetchMyCartProducts } from '../../api_calls/products'

const user = {
    namespaced: true,
    state: {
        userProfile: {},
        cartProducts: [],
        authtoken: '',
    },
    getters: {
        isAuthor: (state) => (authorId) => {
            return state.userProfile._id === authorId
        },
        isItemInCart: (state) => (itemId) => {
            return state.userProfile.cart.find(item => item === itemId)
        },
        cartTotalPrice(state) {
            return state.cartProducts
                   .map(product => Number(product.price))
                   .reduce((numX, numY) => numX + numY, 0)
                   .toString() + ' $'
        }
    },
    mutations: {
        updateCartProducts(state, productId) {
            console.log(state.cartProducts);
            console.log(productId);
            state.cartProducts = state.cartProducts.filter(p => p._id !== productId)
        },
        saveCartProducts(state, products) {
            state.cartProducts = products
        },
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
        },
    },
    actions: {
        fetchCartProducts({ commit }, payload) {
            commit('saveCartProducts', payload)
        },
        wasCartProductDeleted({ commit, state }) {
            let newProfileObject = { ...state.userProfile }
            let userId = state.userProfile._id
            let cartIds = state.userProfile.cart
            let storeUpdatedIds;
            
            fetchMyCartProducts(cartIds)
                .then(res => {
                    // Check if some user has deleted his product by comparing both array lengths
                    if (cartIds.length !== res.data.length) {
                        storeUpdatedIds = res.data.map(item => item._id)
                        newProfileObject.cart = storeUpdatedIds

                        updateUserInfo(userId, newProfileObject)
                            .then(res => {
                                alert('Some product/s from your cart has been sold or removed')
                                commit('saveSession', newProfileObject)
                            })
                            .catch(err => console.log(err))
                    }
                })
                .catch(err => console.log(err))
        },
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
                    commit('updateCartProducts', productId)
                })
                .catch(err => console.log(err))
        },
        checkoutCart({ commit, state }) {
            let newProfileObject = { ...state.userProfile }
            let userId = state.userProfile._id
            newProfileObject.cart = []

            updateUserInfo(userId, newProfileObject)
            .then(res => {
                commit('saveSession', newProfileObject)
                router.push('/')
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