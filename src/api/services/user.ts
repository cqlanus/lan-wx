import { getConfigVar, request } from '../../utils'

export default class User {
    BASE = getConfigVar('LAN_WX_API')

    create = async (username: string) => {
        const url = `${this.BASE}/user`
        const created = await request(url, {
            method: 'POST',
            body: JSON.stringify({ username })
        })
        return created
    }

    get = async (username: string) => {
        const url = `${this.BASE}/user/${username}`
        const found = await request(url)
        return found
    }
}
