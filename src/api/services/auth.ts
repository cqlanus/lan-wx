import { Auth } from 'aws-amplify'

export default class AuthService {
    getAuthUser = async () => {
        const authUser = await Auth.currentAuthenticatedUser()
        const { username, attributes, userDataKey } = authUser
        return { username, attributes, userDataKey }
    }

    logout = async () => {
        return await Auth.signOut()
    }
}
