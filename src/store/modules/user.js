import router from '../../router'
import * as userTypes from '../mutation-types/user'
import { updateUserInfo, fetchUserInfo } from '../../api_calls/user'
import { fetchCartProducts } from '../../api_calls/products'
import { getField, updateField } from 'vuex-map-fields'
import wait from '../../wait'

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
        cartProductDeleted: false,
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
        },
        getAge: state => birthDate => {

            let todayDate = new Date().toISOString().substr(0, 10);
            let splitTodayDate = todayDate.split('-')
            console.log(birthDate)
            let splitBirthDate = birthDate.split('-')
        
            let todayYear = splitTodayDate[0]
            let todayMonth = splitTodayDate[1]
            let birthDateYear = splitBirthDate[0]
            let birthDateMonth = splitBirthDate[1]
        
            let age = todayYear - birthDateYear;
            let month = todayMonth - birthDateMonth;
            if (month < 0 || (month === 0 && todayDate < birthDate)) {
                age--;
            }
            return age;
        },
    },
    mutations: {
        updateField,
        [userTypes.SET_USER_DETAILS] (state, payload) {
            state.userDetails = payload;
        },
        [userTypes.CLEAR_USER_DETAILS] (state) {
            state.userDetails = null
        },
        [userTypes.EDIT_USER_INFO] (state, updatedUserProfile) {
            state.userProfile = updatedUserProfile
        }, 
        [userTypes.UPDATE_CART_PRODUCTS] (state, productId) {
            state.cartProducts = state.cartProducts.filter(p => p._id !== productId)
        },
        [userTypes.SAVE_PRODUCTS_TO_CART] (state, products) {
            state.cartProducts = products
        },
        [userTypes.OPEN_DELETED_CART_PRODUCT_DIALOG ] (state) {
            state.cartProductDeleted = true
        },
        [userTypes.CLOSE_DELETED_CART_PRODUCT_DIALOG] (state) {
            state.cartProductDeleted = false
        },
        [userTypes.SET_EDIT_USER_INFO_FORM_FIELDS] (state) {
            state.editUserInfo.email = state.userProfile.email
            state.editUserInfo.gender = state.userProfile.gender
            state.editUserInfo.city = state.userProfile.city
            state.editUserInfo.phone = state.userProfile.phone
        },
        [userTypes.SAVE_USER_SESSION](state, response_data) {
            state.userProfile = response_data
            state.authtoken = response_data._kmd.authtoken

            localStorage.setItem('userData', JSON.stringify(response_data))
        },
        [userTypes.GET_USER_SESSION] (state) {
            const userData = JSON.parse(localStorage.getItem('userData'))

            if (userData) {
                state.userProfile = userData
                state.authtoken = userData._kmd.authtoken
            }
        },
        [userTypes.CLEAR_USER_SESSION] (state) {
            localStorage.removeItem('userData')
            state.userProfile = {}
            state.authtoken = ''
            router.push('/login')
        },
    },
    actions: {
        async editUserInfo({ commit, state }, payload) {
            let userId = state.userProfile._id
            
            wait.start('edit user info loading')
            let userInfo = await updateUserInfo(userId, payload)
            wait.end('edit user info loading')

            commit(userTypes.SAVE_USER_SESSION, userInfo.data)
            commit(userTypes.EDIT_USER_INFO, userInfo.data)

            router.push('/myProfile') 
        },
        async wasCartProductDeleted({ commit, state }) {
            let newProfileObject = { ...state.userProfile }
            let userId = state.userProfile._id
            let cartIds = state.userProfile.cart
            let storeUpdatedIds;

            let cartProducts = await fetchCartProducts(cartIds)
                
            // Check if some user has deleted his product by comparing both array lengths
            if (cartIds.length !== cartProducts.data.length) {
                storeUpdatedIds = cartProducts.data.map(item => item._id)
                newProfileObject.cart = storeUpdatedIds

                await updateUserInfo(userId, newProfileObject)
                commit(userTypes.OPEN_DELETED_CART_PRODUCT_DIALOG)
                commit(userTypes.SAVE_USER_SESSION, newProfileObject)
            }
        },
        closeDeletedCartProductDialog({ commit }) {
            commit(userTypes.CLOSE_DELETED_CART_PRODUCT_DIALOG)
        },
        async addToCart({ commit, state }, productId) {
            let newProfileObject = { ...state.userProfile }
            let userId = state.userProfile._id
            newProfileObject.cart.push(productId)

            await updateUserInfo(userId, newProfileObject)
            commit(userTypes.SAVE_USER_SESSION, newProfileObject)
        },
        async removeFromCart({ commit, state }, productId) {
            let newProfileObject = { ...state.userProfile }
            let userId = state.userProfile._id
            let newCart = newProfileObject.cart.filter(oldProductId => oldProductId !== productId)
            newProfileObject.cart = newCart

            wait.start(`remove cart item loading ${productId}`)
            await updateUserInfo(userId, newProfileObject)
            wait.end(`remove cart item loading ${productId}`)

            commit(userTypes.SAVE_USER_SESSION, newProfileObject)
            commit(userTypes.UPDATE_CART_PRODUCTS, productId)
        },
        async checkoutCart({ commit, state }) {
            let newProfileObject = { ...state.userProfile }
            let userId = state.userProfile._id
            newProfileObject.cart = []

            wait.start('checkout loading btn');
            await updateUserInfo(userId, newProfileObject)
            wait.end('checkout loading btn')

            commit(userTypes.SAVE_USER_SESSION, newProfileObject) 
            router.push('/')
        },
        async getUserDetails({ commit }, userId) {
            let userInfo = await fetchUserInfo(userId)
            commit(userTypes.SET_USER_DETAILS, userInfo.data)
        },
        clearUserDetails({ commit }) {
            commit(userTypes.CLEAR_USER_DETAILS)
        },
        saveSession({ commit }, response_data) {
            commit(userTypes.SAVE_USER_SESSION, response_data)
            router.push("/");
        },
        getSession({ commit }) {
            commit(userTypes.GET_USER_SESSION)
        },
        clearSession({ commit }) {
            commit(userTypes.CLEAR_USER_SESSION)
        },
        fetchCartProducts({ commit }, payload) {
            commit(userTypes.SAVE_PRODUCTS_TO_CART, payload)
        },
        setEditUserFormFields({ commit }) {
            commit(userTypes.SET_EDIT_USER_INFO_FORM_FIELDS)
        }
    }
}

export default user