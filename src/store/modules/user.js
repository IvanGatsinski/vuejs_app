import router from '../../router'

const user = {
    namespaced: true,
    state: {
        userProfile: {},
        authtoken: '',
    },
    mutations: {
        saveSession(state, response_data) {
            state.userProfile = response_data
            state.authtoken = response_data._kmd.authtoken

            localStorage.setItem('userData', JSON.stringify(response_data))
        },
        getSession(state) {  
            const userData = JSON.parse(localStorage.getItem('userData'))
            console.log(userData);
            
            if (userData) {
                state.userProfile = userData
                state.authtoken = userData._kmd.authtoken
            }
        },
        clearSession(state) {
            localStorage.removeItem('userData')
            state.userProfile = {}
            state.authtoken = ''
            router.push('/login')
        }
    },
    actions: {
        saveSession({ commit }, response_data) {
            commit('saveSession', response_data)
            router.push("/");
        },
        getSession({ commit }) {
            commit('getSession')
        },
        clearSession({ commit }) {
            commit('clearSession')
        }
    }
}

export default user