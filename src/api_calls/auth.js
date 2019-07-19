import { get, post } from './helpers'

function registerUser(data) {
    return post(`/user/${process.env.VUE_APP_KEY}` ,data, 'Basic')
}
function loginUser(data) {
    return post(`/user/${process.env.VUE_APP_KEY}/login`, data, 'Basic')
}
function logoutUser() {
    return post(`/user/${process.env.VUE_APP_KEY}/_logout`, {}, 'Kinvey')
}

export {
    registerUser,
    loginUser,
    logoutUser
}