import router from '../../router'
import { updateUserInfo, fetchUserInfo } from '../../api_calls/user'
import { fetchCartProducts } from '../../api_calls/products'
import { getField, updateField } from 'vuex-map-fields'

const user = {
    namespaced: true,
    state: {
        userProfile: {},
        userDetails: null,
        cartProducts: [],
        editUserInfo: {
            valid: false,
            email: '',
            gender: '',
            city: '',
            phone: '',
        },
        authtoken: '',
    },
    getters: {
        getField,
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
        updateField,
        setUserDetails(state, payload) {
            state.userDetails = payload;
        },
        clearUserDetails(state) {
            state.userDetails = null
        },
        editUserInfo(state, updatedUserProfile) {
            state.userProfile = updatedUserProfile
        }, 
        updateCartProducts(state, productId) {
            state.cartProducts = state.cartProducts.filter(p => p._id !== productId)
        },
        saveCartProducts(state, products) {
            state.cartProducts = products
        },
        setEditUserInfoFields(state) {
            state.editUserInfo.email = state.userProfile.email
            state.editUserInfo.gender = state.userProfile.gender
            state.editUserInfo.city = state.userProfile.city
            state.editUserInfo.phone = state.userProfile.phone
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
        editUserInfo({ commit, state }, payload) {
            let userId = state.userProfile._id
            
            updateUserInfo(userId, payload)
                .then(res => {
                    console.log(res);
                    commit('saveSession', res.data)
                    commit('editUserInfo', res.data)
                    router.push('/myProfile')
                })     
                .catch(err => console.log(err))  
        },
        fetchCartProducts({ commit }, payload) {
            commit('saveCartProducts', payload)
        },
        wasCartProductDeleted({ commit, state }) {
            let newProfileObject = { ...state.userProfile }
            let userId = state.userProfile._id
            let cartIds = state.userProfile.cart
            let storeUpdatedIds;
            console.log('await')
            fetchCartProducts(cartIds)
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
        getUserDetails({ commit }, userId) {
            fetchUserInfo(userId)
                .then(res => {
                    commit('setUserDetails', res.data)
                    console.log(res)
                    
                })
                .catch(err => console.log(err))
        },
        clearUserDetails({ commit }) {
            commit('clearUserDetails')
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
        },
    }
}

export default user