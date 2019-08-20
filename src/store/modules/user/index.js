import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const user = {
    namespaced: true,
    state : {
        userProfile: {},
        userDetails: null,
        cartProducts: [],
        editUserInfo: {
            valid: false,
            email: '',
            gender: '',
            city: '',
            phone: '',
        },
        authtoken: '',
        cartProductDeleted: false,
    },
    getters,
    mutations,
    actions
}

export default user