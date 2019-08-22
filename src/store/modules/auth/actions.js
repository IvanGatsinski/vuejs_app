import wait from '@/wait'
import { authenticateUser } from '@/api_calls/auth'

const authenticate = async ({ dispatch, commit }, user_data) => {
    try {
        wait.start('loading auth btn')
        let user = await authenticateUser({...user_data})
        wait.end('loading auth btn')

        user_data.authType === 'login' ?
        dispatch('setSuccessMessage', `Hey ${user_data.username}, enjoy your time.`, { root : true }) :
        dispatch('setSuccessMessage', `Congratulations ${user_data.username}, you've just signed up in our app.`, { root : true })
        dispatch('showSuccess', null, { root : true })

        dispatch('user/saveSession', user.data, { root : true })
    } catch (error) {
        let statusCode = error.message.match(/[0-9]+/)[0]
        switch (statusCode) {
            case '401':
                error.message = "Invalid username or password!"
                break;
            case '409':
                error.message = "Username is already taken!"
                break;
            default:
                break;
        }
        wait.end('loading auth btn')
        
        dispatch('setErrorMessage', error.message, { root : true })
        dispatch('showError', null, { root : true })
    }
}
const logout = ({ dispatch }) => {
    dispatch('user/clearSession', null, { root : true })
}

export default {
    authenticate,
    logout
}