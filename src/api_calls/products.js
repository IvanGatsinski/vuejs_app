import { get, post, remove } from './helpers'

function fetchAllProducts() {
    return get(`/appdata/${process.env.VUE_APP_KEY}/products`)
}
function addProduct(data) {
    return post(`/appdata/${process.env.VUE_APP_KEY}/products`, data, '')
}
function removeProduct(id) {
    return remove(`/appdata/${process.env.VUE_APP_KEY}/products/${id}`)
}

export {
    fetchAllProducts,
    addProduct,
    removeProduct,
}