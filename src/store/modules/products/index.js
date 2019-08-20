import getters from './getters'
import mutations from './mutations'
import actions from './actions'

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
    getters,
    mutations,
    actions
}

export default products