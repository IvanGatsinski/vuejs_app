import { updateField } from 'vuex-map-fields'

const UPDATE_PRODUCT = (state, payload) => {
    let newArr = []
    state.allProducts.forEach((val, i) => {
        if (val._id === payload._id) {
            newArr.push(payload)
        }
        else {
            newArr.push(val)
        }
    })
    state.allProducts = newArr
}
const FETCH_ALL_PRODUCTS = (state, payload) => {
    state.allProducts = payload
}
const UPDATE_MY_PRODUCTS = (state, payload) => {
    state.myProducts = payload
}
const SET_RANDOM_USER_PRODUCTS = (state, payload) => {
    state.randomUserProducts = payload
}
const SET_EDIT_PRODUCT_FORM_FIELDS = (state, payload) => {
    state.editProduct.productName = payload.name
    state.editProduct.productPrice = payload.price
    state.editProduct.productDescription = payload.description
    state.editProduct.productCondition = payload.condition
}
const SET_PRODUCT_DETAILS = (state, payload) => {
    state.productDetails = payload
}
const CLEAR_RANDOM_USER_PRODUCTS = (state) => {
    state.randomUserProducts = null
}
const CLEAR_MY_PRODUCTS = (state) => {
    state.myProducts = null
}
const CLEAR_PRODUCT_DETAILS = (state) => {
    state.productDetails = null
}

export default {
    updateField,
    UPDATE_PRODUCT,
    FETCH_ALL_PRODUCTS,
    UPDATE_MY_PRODUCTS,
    SET_RANDOM_USER_PRODUCTS,
    SET_EDIT_PRODUCT_FORM_FIELDS,
    SET_PRODUCT_DETAILS,
    CLEAR_RANDOM_USER_PRODUCTS,
    CLEAR_MY_PRODUCTS,
    CLEAR_PRODUCT_DETAILS,
}