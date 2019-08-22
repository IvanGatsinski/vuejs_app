import wait from '@/wait'
import router from '@/router'
import { updateUserInfo, fetchUserInfo } from '@/api_calls/user'
import { fetchCartProducts } from '@/api_calls/products'

const editUserInfo = async ({ commit, state, dispatch }, payload) => {
    let userId = state.userProfile._id
    
    wait.start('edit user info loading')
    let userInfo = await updateUserInfo(userId, payload)
    wait.end('edit user info loading')

    commit('SAVE_USER_SESSION', userInfo.data)
    commit('EDIT_USER_INFO', userInfo.data)

    dispatch('setSuccessMessage', 'You have successfully updated your profile information.', { root : true })
    dispatch('showSuccess', null, { root : true })
    router.push({ name : 'userDetails' }) 
}
const wasCartProductDeleted = async ({ commit, state }) => {
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
        commit('OPEN_DELETED_CART_PRODUCT_DIALOG')
        commit('SAVE_USER_SESSION', newProfileObject)
    }
}
const closeDeletedCartProductDialog = ({ commit }) => {
    commit('CLOSE_DELETED_CART_PRODUCT_DIALOG')
}
const addToCart = async ({ commit, state }, productId) => {
    let newProfileObject = { ...state.userProfile }
    let userId = state.userProfile._id
    newProfileObject.cart.push(productId)

    await updateUserInfo(userId, newProfileObject)
    commit('SAVE_USER_SESSION', newProfileObject)
}
const removeFromCart = async ({ commit, state }, productId) => {
    let newProfileObject = { ...state.userProfile }
    let userId = state.userProfile._id
    let newCart = newProfileObject.cart.filter(oldProductId => oldProductId !== productId)
    newProfileObject.cart = newCart

    wait.start(`remove cart item loading ${productId}`)
    await updateUserInfo(userId, newProfileObject)
    wait.end(`remove cart item loading ${productId}`)

    commit('SAVE_USER_SESSION', newProfileObject)
    commit('UPDATE_CART_PRODUCTS', productId)
}
const checkoutCart = async ({ commit, state, dispatch }) => {
    let oldCart = { ...state.userProfile }
    let soldCartItemsMessage;
    let newProfileObject = { ...state.userProfile }
    let userId = state.userProfile._id
    newProfileObject.cart = []
    
    wait.start('checkout loading btn');
    await updateUserInfo(userId, newProfileObject)
    wait.end('checkout loading btn')

    state.userProfile.cart.length > 1 ? 
    soldCartItemsMessage = 'items' :
    soldCartItemsMessage = 'item'

    commit('SAVE_USER_SESSION', newProfileObject) 
    dispatch('setSuccessMessage', `You successfully bought ${oldCart.cart.length} ${soldCartItemsMessage}`, { root : true })
    dispatch('showSuccess', null, { root : true })
    router.push('/')
}
const getUserDetails = async ({ commit }, userId) => {
    let userInfo = await fetchUserInfo(userId)
    commit('SET_USER_DETAILS', userInfo.data)
}
const clearUserDetails = ({ commit }) => {
    commit('CLEAR_USER_DETAILS')
}
const saveSession = ({ commit }, response_data) => {
    commit('SAVE_USER_SESSION', response_data)
    router.push("/");
}
const getSession = ({ commit }) => {
    commit('GET_USER_SESSION')
}
const clearSession = ({ commit }) => {
    commit('CLEAR_USER_SESSION')
}
const getCartProducts = ({ commit }, payload) => {
    commit('SAVE_PRODUCTS_TO_CART', payload)
}

export default {
    editUserInfo,
    wasCartProductDeleted,
    closeDeletedCartProductDialog,
    addToCart,
    removeFromCart,
    checkoutCart,
    getUserDetails,
    clearUserDetails,
    clearSession,
    getSession,
    saveSession,
    getCartProducts,
}