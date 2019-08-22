import router from '@/router'
import wait from '@/wait'
import { 
    fetchAllProducts,
    fetchProducts,
    fetchProduct,
    addProduct,
    updateProduct,
    deleteProduct, } from '@/api_calls/products'

const getAllProducts = async ({ commit }) => {
    let products = await fetchAllProducts()

    commit('FETCH_ALL_PRODUCTS', products.data)
}
const getUserProducts  = async ({ commit }, id) => {
    let products = await fetchProducts(id)

    commit('SET_RANDOM_USER_PRODUCTS', products.data)
}
const getMyProducts = async ({ commit }, id) => { 
    let myProducts = await fetchProducts(id)

    commit('UPDATE_MY_PRODUCTS', myProducts.data)
}
const createProduct = async ({ dispatch }, productData) => {
    wait.start('create product loading btn')
    await addProduct(productData)
    wait.end('create product loading btn')

    dispatch('getAllProducts')
    dispatch('setSuccessMessage', 'You successfully created product for sale', { root : true })
    dispatch('showSuccess', null, { root : true })
    router.push('/')
}
const editProduct = async ({ commit, state, rootState, dispatch}, productId) => {
    let productData = {
        name: state.editProduct.productName,
        price: state.editProduct.productPrice,
        description: state.editProduct.productDescription,
        condition: state.editProduct.productCondition,
        author: rootState.user.userProfile.username
    }
    wait.start('edit product loading btn')
    let product = await updateProduct(productId, productData)
    wait.end('edit product loading btn')

    commit('UPDATE_PRODUCT', product.data)

    dispatch('setSuccessMessage', `You successfully editted ${productData.name}`, { root : true })
    dispatch('showSuccess', null, { root : true })
    router.push('/')
}
const setProductForEdit = async ({ commit }, productId) => {
    let product = await fetchProduct(productId)
        
    commit('SET_EDIT_PRODUCT_FORM_FIELDS', product.data)
}
const getProductDetails = async ({ commit }, productId) => {
    let product = await fetchProduct(productId)
      
    commit('SET_PRODUCT_DETAILS', product.data)
}
const removeProduct = async ({ dispatch, rootState }, { id, collection }) => {
    wait.start('delete progress loader')
    await deleteProduct(id)
    wait.end('delete progress loader')
    
    switch (collection) {
        case 'allProducts' : 
            dispatch('getAllProducts')
            return;
        case 'myProducts' :
            dispatch('getAllProducts')
            dispatch('getUserProducts', rootState.user.userProfile._id)
            return;
        default: return;
    }
}
const clearUserProducts = ({ commit }) => {
    commit('CLEAR_RANDOM_USER_PRODUCTS')
}
const clearProductDetails = ({ commit }) => {
    commit('CLEAR_PRODUCT_DETAILS')
}
const clearMyProducts = ({ commit }) => {
    commit('CLEAR_MY_PRODUCTS')
}

export default {
    getAllProducts,
    getUserProducts,
    getMyProducts,
    createProduct,
    editProduct,
    setProductForEdit,
    getProductDetails,
    removeProduct,
    clearUserProducts,
    clearProductDetails,
    clearMyProducts,
}