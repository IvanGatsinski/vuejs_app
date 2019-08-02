import { get, put } from './helpers'

function fetchUserInfo(id) {
    return get(`/user/${process.env.VUE_APP_KEY}/${id}`)
}
function updateUserInfo(id, data) {
    return put(`/user/${process.env.VUE_APP_KEY}/${id}`, data)
}

export {
    fetchUserInfo,
    updateUserInfo,
}