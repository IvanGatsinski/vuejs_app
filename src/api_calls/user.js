import { get } from './helpers'

function fetchMyProducts(loggedUserId) {
    return get(`/appdata/${process.env.VUE_APP_KEY}/products?query={"_acl.creator":"${loggedUserId}"}`)
}

export {
    fetchMyProducts,
}