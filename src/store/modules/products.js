import {
    fetchAllProducts,
    fetchProducts,
    fetchProduct,
    updateProduct,
    addProduct,
    removeProduct
} from '../../api_calls/products'
import { getField, updateField } from 'vuex-map-fields'
import router from '../../router'

const products = {
    namespaced: true,
    state: {
        allProducts: [],
        myProducts: [],
        randomUserProducts: null,
        productDetails: null,
        createProduct: {
            valid: false,
            productName: '',
            productPrice: null,
            productDescription: '',
            productCondition: '',
        },
        editProduct: {
            valid: false,
            productName: '',
            productPrice: null,
            productDescription: '',
            productCondition: '',
        }
    },
    getters: {
        getField,
        productPublishedDate: state  => published => {
            let date = new Date(published),
            year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate(),
            hours = date.getHours(),
            minutes = date.getMinutes(),
            seconds = date.getSeconds(),
            dayOrNight = hours >= 0 && hours <= 12 ? 'AM' : 'PM'

            month < 10 ? month = `0${month}` : false
            day < 10 ? day = `0${day}` : false
            hours < 10 ? hours = `0${hours}` : false
            minutes < 10 ? minutes = `0${minutes}` : false
            seconds < 10 ? seconds = `0${seconds}` : false
        
            return `Published on ${day}-${month}-${year} at ${hours}:${minutes}:${seconds} ${dayOrNight}.`
        },
        productLastEdittedDate: state => lastEdit => {
            let date = new Date(lastEdit),
            year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate(),
            hours = date.getHours(),
            minutes = date.getMinutes(),
            seconds = date.getSeconds(),
            dayOrNight = hours >= 0 && hours <= 12 ? 'AM' : 'PM'

            month < 10 ? month = `0${month}` : false
            day < 10 ? day = `0${day}` : false
            hours < 10 ? hours = `0${hours}` : false
            minutes < 10 ? minutes = `0${minutes}` : false
            seconds < 10 ? seconds = `0${seconds}` : false

            return `Last modified on ${day}-${month}-${year} at ${hours}:${minutes}:${seconds} ${dayOrNight}.`
        }
    },
    mutations: {
        updateField,
        updateProduct(state, payload) {
            let newArr = []
            state.allProducts.forEach((val, i) => {
                if (val._id === payload._id) {
                    newArr.push(payload)
                }
                else {
                    newArr.push(val)
                }
            })
            console.log(newArr);
            
            state.allProducts = newArr
        },
        fetchAllProducts(state, payload) {
            state.allProducts = payload.reverse()//TODO CHANGE IT LATER WITH QUERY
        },
        updateMyProducts(state, payload) {
            state.myProducts = payload
        },
        updateRandomUserProducts(state, payload) {
            state.randomUserProducts = payload
        },
        setEditProductFields(state, payload) {
            state.editProduct.productName = payload.name
            state.editProduct.productPrice = payload.price
            state.editProduct.productDescription = payload.description
            state.editProduct.productCondition = payload.condition
        },
        setProductDetails(state, payload) {
            state.productDetails = payload
        },
        clearRandomUserProducts(state) {
            state.randomUserProducts = null
        }
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
        getRandomUserProducts({ commit }, id) {
            fetchProducts(id)
                .then(res => {
                    commit('updateRandomUserProducts', res.data)
                })
                .catch(err => {
                    console.warn(err);
                })
        },
        getMyProducts({ commit }, id) { 
            fetchProducts(id)
                .then(res => {
                    console.log(res)
                    commit('updateMyProducts', res.data)
                }) // TODO => Refactor this func and getRandomUser...into one
                .catch(err => {
                    console.warn(err);
                })
        },
        createProduct({ dispatch, commit }, productData) {
            addProduct(productData)
                .then(() => {
                    dispatch('fetchAllProducts')
                    router.push('/')

                    // commit('clearCreateProductFields')
                })
                .catch()
        },
        editProduct({ commit, state }, productId) {
            let productData = {
                name: state.editProduct.productName,
                price: state.editProduct.productPrice,
                description: state.editProduct.productDescription,
                condition: state.editProduct.productCondition
            }
            updateProduct(productId, productData)
                .then(res => {
                    commit('updateProduct', res.data)
                    router.push('/')
                })
                .catch(err => {
                    console.warn(err);
                })
        },
        setProductForEdit({ commit }, productId) {
            fetchProduct(productId)
                .then(res => {
                    commit('setEditProductFields', res.data)
                })
                .catch(err => console.warn('EBASI'));
        },
        // setProductDetails({ commit }, productId) {
        //     fetchProduct(productId)
        //         .then(res => {
        //             commit('setProductDetails', res.data)

        // },
        removeProduct({ dispatch }, id) {
            removeProduct(id)
                .then(res => {
                    dispatch('fetchAllProducts')
                })
                .catch(err => console.log(err))
        },
        clearRandomUserProducts({ commit }) {
            commit('clearRandomUserProducts')
        }
    },
}

export default products