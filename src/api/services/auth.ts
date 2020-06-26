import { Auth } from 'aws-amplify'

export default class AuthService {
    getAuthUser = async () => {
        const authUser = await Auth.currentAuthenticatedUser()
        return authUser
    }

    logout = async () => {
        return await Auth.signOut()
    }
}
