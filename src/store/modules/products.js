import { fetchAllProducts, fetchMyProducts, addProduct, removeProduct } from '../../api_calls/products'
import { fetchUserInfo, updateUserInfo } from '../../api_calls/user'
import { getField, updateField } from 'vuex-map-fields'
import router from '../../router'

const products = {
    namespaced: true,
    state: {
        allProducts: [],
        myProducts: [],
        createProduct: {
            name: '',
            price: null,
            description: '',
            condition: '',
        }
    },
    getters: {
        getField
    },
    mutations: {
        updateField,
        fetchAllProducts(state, payload) {
            state.allProducts = [...payload].reverse()
        },
        fetchMyProducts(state, payload) {
            state.myProducts = [...payload]
        },
    },
    actions: {
        fetchAllProducts({ commit }) {
            fetchAllProducts()
                .then(res => {
                    commit('fetchAllProducts', res.data)
                })
                .catch(err => {
                    console.log(err);
                })
        },
        fetchMyProducts({ commit }, loggedUserId) {
            fetchMyProducts(loggedUserId)
                .then(res => {
                    commit('fetchMyProducts', res.data)
                })
                .catch(err => {
                    console.warn(err);
                })
        },
        createProduct({ dispatch }, productData) {
            addProduct(productData)
                .then(() => {
                    dispatch('fetchAllProducts')
                    router.push('/')
                })
                .catch()
        },
        removeProduct({ dispatch }, id) {
            removeProduct(id)
                .then(res => {
                    dispatch('fetchAllProducts')
                })
                .catch(err => console.log(err))
        },
        addOrRemoveProductInFavs({ dispatch, rootState }, productId) {
            const LOGGED_USER_ID = rootState.user.userProfile._id
            let userData = {...rootState.user.userProfile}

            fetchUserInfo(LOGGED_USER_ID)
                .then(res => {
                    let favouritesList = res.data.favouriteProducts

                    if (favouritesList.includes(productId)) {
                        favouritesList = favouritesList.filter(p => p !== productId)
                    }
                    else {
                        favouritesList.push(productId)
                    }
                    userData.favouriteProducts = favouritesList
                    
                    updateUserInfo(LOGGED_USER_ID, userData)
                        .then(res => {
                            const UPDATED_USER_DATA = res.data
                            dispatch('user/saveSession', UPDATED_USER_DATA, { root : true })
                        })
                        .catch(err => console.warn(err))
                })
                .catch(err => console.log(err));
        },
    },
}

export default products