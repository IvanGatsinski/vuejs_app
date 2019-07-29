import { fetchAllProducts, addProduct } from '../../api_calls/products'
import { getField, updateField } from 'vuex-map-fields'
import router from '../../router'

const products = {
    namespaced: true,
    state: {
        allProducts: [],
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
            state.allProducts = [...payload]
        },
        // addProduct(state, productData) {
        //     state.allProducts = [...state.allProducts, productData]
        // }
    },
    actions: {
        fetchAllProducts({ commit }) {
            fetchAllProducts()
            .then(res => {
                console.log(res);
                commit('fetchAllProducts', res.data)
            })
            .catch(err => {
                console.log(err);  
            })
        },
        createProduct({ dispatch }, productData) {
            addProduct(productData)
            .then(() => {
                dispatch('fetchAllProducts')
                router.push('/')
            })
            .catch()
        }
    },
}

export default products