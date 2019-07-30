import { fetchMyProducts } from '../../api_calls/user'
const user = {
    namespaced: true,
    state: {
        myProducts: []
    },
    mutations: {
        fetchMyProducts(state, payload) {
            state.myProducts = [...payload]
        }
    },
    actions: {
        fetchMyProducts({ commit }, loggedUserId) {
            fetchMyProducts(loggedUserId)
                .then(res => {
                    commit('fetchMyProducts', res.data)
                })
                .catch(err => {
                    console.warn(err);
                })
        }
    }
}

export default user