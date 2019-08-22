import router from '@/router'
import { updateField } from 'vuex-map-fields'
import store from '@/store'

const SET_USER_DETAILS = (state, payload) => {
    state.userDetails = payload;
}
const CLEAR_USER_DETAILS = (state) => {
    state.userDetails = null
}
const EDIT_USER_INFO = (state, updatedUserProfile) => {
    state.userProfile = updatedUserProfile
}
const UPDATE_CART_PRODUCTS = (state, productId) => {
    state.cartProducts = state.cartProducts.filter(p => p._id !== productId)
}
const SAVE_PRODUCTS_TO_CART = (state, products) => {
    state.cartProducts = products
}
const OPEN_DELETED_CART_PRODUCT_DIALOG = (state) => {
    state.cartProductDeleted = true
}
const CLOSE_DELETED_CART_PRODUCT_DIALOG = (state) => {
    state.cartProductDeleted = false
}
const SET_EDIT_USER_INFO_FORM_FIELDS = (state) => {
    state.editUserInfo.email = state.userProfile.email
    state.editUserInfo.gender = state.userProfile.gender
    state.editUserInfo.city = state.userProfile.city
    state.editUserInfo.phone = state.userProfile.phone
}
const SAVE_USER_SESSION = (state, response_data) => {
    state.userProfile = response_data
    state.authtoken = response_data._kmd.authtoken

    localStorage.setItem('userData', JSON.stringify(response_data))
}
const GET_USER_SESSION = (state) => {
    const userData = JSON.parse(localStorage.getItem('userData'))

    if (userData) {
        state.userProfile = userData
        state.authtoken = userData._kmd.authtoken
    }
}
const CLEAR_USER_SESSION = (state) => {
    localStorage.removeItem('userData')
    state.userProfile = {}
    state.authtoken = ''

    router.push('/login')
    store.dispatch('setSuccessMessage', 'You have successfully logged out!')
    store.dispatch('showSuccess')
}

export default {
    updateField,
    SET_USER_DETAILS,
    CLEAR_USER_DETAILS,
    EDIT_USER_INFO,
    UPDATE_CART_PRODUCTS,
    SAVE_PRODUCTS_TO_CART,
    OPEN_DELETED_CART_PRODUCT_DIALOG,
    CLOSE_DELETED_CART_PRODUCT_DIALOG,
    SET_EDIT_USER_INFO_FORM_FIELDS,
    SAVE_USER_SESSION,
    GET_USER_SESSION,
    CLEAR_USER_SESSION
}