import { get, post } from './helpers'

function registerUser(data) {
    return post(`/user/kid_SJ6pGDOWH` ,data, 'Basic')
}
function loginUser(data) {
    return post(`/user/kid_SJ6pGDOWH/login`, data, 'Basic')
}
function logoutUser() {
    return post(`/user/kid_SJ6pGDOWH/_logout`, {}, 'Kinvey')
}

export {
    registerUser,
    loginUser,
    logoutUser
}