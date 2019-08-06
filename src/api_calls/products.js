import { get, put, post, remove } from './helpers'

function fetchAllProducts() {
    return get(`/appdata/${process.env.VUE_APP_KEY}/products`)
}
function fetchMyProducts(loggedUserId) {
    return get(`/appdata/${process.env.VUE_APP_KEY}/products?query={"_acl.creator":"${loggedUserId}"}`)
}
function fetchProduct(productId) {
    return get(`/appdata/${process.env.VUE_APP_KEY}/products/${productId}`)
}
function updateProduct(productId, data) {
    return put(`/appdata/${process.env.VUE_APP_KEY}/products/${productId}`, data)
}
function addProduct(data) {
    return post(`/appdata/${process.env.VUE_APP_KEY}/products`, data, '')
}
function removeProduct(id) {
    return remove(`/appdata/${process.env.VUE_APP_KEY}/products/${id}`)
}
function fetchMyCartProducts(id) {
    return get(`/appdata/${process.env.VUE_APP_KEY}/products?query={"sellerId":"[${id}]"}`)
}

export {
    fetchAllProducts,
    fetchMyProducts,
    fetchMyCartProducts,
    fetchProduct,
    updateProduct,
    addProduct,
    removeProduct,
}