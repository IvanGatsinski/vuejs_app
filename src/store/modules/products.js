import { fetchAllProducts,
         fetchMyProducts,
         fetchProduct,
         editProduct, 
         addProduct, 
         removeProduct } from '../../api_calls/products'
import { getField, updateField } from 'vuex-map-fields'
import router from '../../router'

const products = {
    namespaced: true,
    state: {
        allProducts: [],
        myProducts: [],
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
        getField
    },
    mutations: {
        updateField,
        clearCreateProductFields(state) {
            state.createProduct.productName = ''
            state.createProduct.productPrice = null
            state.createProduct.productDescription = ''
            state.createProduct.productCondition = ''
        },
        fetchAllProducts(state, payload) {
            state.allProducts = [...payload].reverse()
        },
        fetchMyProducts(state, payload) {
            state.myProducts = [...payload]
        },
        setEditProductFields(state, payload) {
            state.editProduct.productName = payload.name
            state.editProduct.productPrice = payload.price
            state.editProduct.productDescription = payload.description
            state.editProduct.productCondition = payload.condition
        },
        clearEditProductFields(state) {
            state.editProduct.productName = ''
            state.editProduct.productPrice = ''
            state.editProduct.productDescription = ''
            state.editProduct.productCondition = ''
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
        createProduct({ dispatch, commit }, productData) {
            addProduct(productData)
                .then(() => {
                    dispatch('fetchAllProducts')
                    router.push('/')

                    commit('clearCreateProductFields')
                })
                .catch()
        },
        editProduct({ state }, productId) {
           let productData = {
            name : state.editProduct.productName,
            price : state.editProduct.productPrice,
            description : state.editProduct.productDescription,
            condition : state.editProduct.productCondition
           }
           editProduct(productId, productData)
            .then(res => {
                router.push('/')
            })
            .catch(err => {
                console.warn(err);
            })
        },
        fetchProduct({ commit }, productId) {
            fetchProduct(productId)
                .then(res => {
                    const ID = res.data._id;
                    
                    commit('setEditProductFields', res.data)
                    router.push(`/product/edit/${ID}`)
                })
                .catch(err => console.warn('EBASI'));
        },
        removeProduct({ dispatch }, id) {
            removeProduct(id)
                .then(res => {
                    dispatch('fetchAllProducts')
                })
                .catch(err => console.log(err))
        },
        clearEditProductFields({ commit }) {
            commit('clearEditProductFields')
        }
    },
}

export default products