import { get, post } from './helpers'

function fetchAllProducts() {
    return get(`/appdata/${process.env.VUE_APP_KEY}/products`)
}
function addProduct(data) {
    return post(`/appdata/${process.env.VUE_APP_KEY}/products`, data, '')
}

export {
    fetchAllProducts,
    addProduct,
}