import {
    fetchAllProducts,
    fetchProducts,
    fetchProduct,
    updateProduct,
    addProduct,
    removeProduct
} from '../../api_calls/products'
import * as productTypes from '../mutation-types/products'
import { getField, updateField } from 'vuex-map-fields'
import router from '../../router'
import wait from '../../wait'

const products = {
    namespaced: true,
    state: {
        allProducts: null,
        myProducts: null,
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
        [productTypes.UPDATE_PRODUCT] (state, payload) {
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
        [productTypes.FETCH_ALL_PRODUCTS] (state, payload) {
            state.allProducts = payload
        },
        [productTypes.UPDATE_MY_PRODUCTS] (state, payload) {
            state.myProducts = payload
        },
        [productTypes.SET_RANDOM_USER_PRODUCTS] (state, payload) {
            state.randomUserProducts = payload
        },
        [productTypes.SET_EDIT_PRODUCT_FORM_FIELDS] (state, payload) {
            state.editProduct.productName = payload.name
            state.editProduct.productPrice = payload.price
            state.editProduct.productDescription = payload.description
            state.editProduct.productCondition = payload.condition
        },
        [productTypes.SET_PRODUCT_DETAILS] (state, payload) {
            state.productDetails = payload
        },
        [productTypes.CLEAR_RANDOM_USER_PRODUCTS] (state) {
            state.randomUserProducts = null
        },
        [productTypes.CLEAR_MY_PRODUCTS] (state) {
            state.myProducts = null
        },
        [productTypes.CLEAR_PRODUCT_DETAILS] (state) {
            state.productDetails = null
        }
    },
    actions: {
        async fetchAllProducts({ commit }) {
            let products = await fetchAllProducts()

            commit(productTypes.FETCH_ALL_PRODUCTS, products.data)
        },
        async getRandomUserProducts({ commit }, id) {
            let products = await fetchProducts(id)

            commit(productTypes.SET_RANDOM_USER_PRODUCTS, products.data)
        },
        async getMyProducts({ commit }, id) { 
            let myProducts = await fetchProducts(id)

            commit(productTypes.UPDATE_MY_PRODUCTS, myProducts.data)
        },
        async createProduct({ dispatch }, productData) {
            wait.start('create product loading btn')
            await addProduct(productData)
            wait.end('create product loading btn')

            dispatch('fetchAllProducts')
            router.push('/')
        },
        async editProduct({ commit, state, rootState}, productId) {
            let productData = {
                name: state.editProduct.productName,
                price: state.editProduct.productPrice,
                description: state.editProduct.productDescription,
                condition: state.editProduct.productCondition,
                author: rootState.user.userProfile.username
            }
            wait.start('edit product loading btn')
            let product = await updateProduct(productId, productData)
            wait.end('edit product loading btn')

            commit(productTypes.UPDATE_PRODUCT, product.data)
            router.push('/')
        },
        async setProductForEdit({ commit }, productId) {
            let product = await fetchProduct(productId)
                
            commit(productTypes.SET_EDIT_PRODUCT_FORM_FIELDS, product.data)
        },
        async getProductDetails({ commit }, productId) {
            let product = await fetchProduct(productId)
              
            commit(productTypes.SET_PRODUCT_DETAILS, product.data)
        },
        async removeProduct({ dispatch }, id) {
            wait.start('delete progress loader')
            await removeProduct(id)
            wait.end('delete progress loader')
            
            dispatch('fetchAllProducts')
        },
        // async removeMyProduct({ dispatch, rootState }, id) {
        //     wait.start('delete progress loader')
        //     await removeProduct(id)
        //     wait.end('delete progress loader')
            
        //     dispatch('getMyProducts', rootState.user.userProfile._id)
        // },
        clearRandomUserProducts({ commit }) {
            commit(productTypes.CLEAR_RANDOM_USER_PRODUCTS)
        },
        clearProductDetails({ commit }) {
            commit(productTypes.CLEAR_PRODUCT_DETAILS)
        },
        clearMyProducts({ commit }) {
            commit(productTypes.CLEAR_MY_PRODUCTS)
        }
    },
}

export default products