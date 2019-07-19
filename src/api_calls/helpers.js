import axios from 'axios'
import store from '../store'

const APP_KEY = process.env.VUE_APP_KEY
const APP_SECRET = process.env.VUE_APP_SECRET

const APP_CREDENTIALS = `${APP_KEY}:${APP_SECRET}`

const BASIC_TOKEN = `${btoa(APP_CREDENTIALS)}`;

function get(url) {
    return axios({
        method: 'GET',
        url: `${url}`,
        headers: {
            'Authorization': `Kinvey ${AUTH_TOKEN}`
        }
    })
}
function post(url, data, auth) {
    const AUTHORIZATION =
        auth === 'Basic' ?
            `Basic ${BASIC_TOKEN}` : `Kinvey ${store.state.authToken}`

    return axios({
        method: 'POST',
        url: `${url}`,
        data,
        headers: {
            'Authorization': AUTHORIZATION
        }
    })
}
function put(url, data) {

    return axios({
        method: 'PUT',
        url: `${url}`,
        data,
        headers: {
            'Authorization': `Kinvey ${store.state.authToken}`
        }
    })
}
function remove(url) {
    
    return axios({
        method: 'DELETE',
        url: `${url}`,
        headers: {
            'Authorization': `Kinvey ${store.state.authToken}`
        }
    })
}

export {
    get, post, put, remove
}