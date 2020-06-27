import { getConfigVar, request } from '../../utils'

export default class User {
    BASE = getConfigVar('LAN_WX_API')

    create = async (username: string) => {
        const url = `${this.BASE}/user`
        const created = await request(url, {
            method: 'POST',
            body: JSON.stringify({ username }),
            headers: { 'Content-type': 'application/json' }
        })
        return created
    }

    get = async (username: string) => {
        const url = `${this.BASE}/user/${username}`
        const found = await request(url)
        return found
    }

    favoriteStation = async (username: string, stationId: string) => {
        const url = `${this.BASE}/user/${username}/favorites`
        const body = { stationId }
        const resp = await request(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-type': 'application/json' }
        })
        return resp
    }
}
