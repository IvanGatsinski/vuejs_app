import { post } from './helpers'

function authenticateUser(data) {
    let authType = data.authType
    delete data.authType
    return authType.toLowerCase() === 'register' ?
           post(`/user/${process.env.VUE_APP_KEY}` ,data, 'Basic') :
           post(`/user/${process.env.VUE_APP_KEY}/login`, data, 'Basic')
}
function logoutUser() {
    return post(`/user/${process.env.VUE_APP_KEY}/_logout`, {}, 'Kinvey')
}

export {
    authenticateUser,
    logoutUser
}