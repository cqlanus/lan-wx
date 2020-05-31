import { getConfigVar } from '../../utils'

export default class Climate {
    BASE = getConfigVar('LAN_WX_API')

    getNorms = async ({ latitude, longitude }: any): Promise<any> => {
        const url = `${this.BASE}/norms/${latitude}/${longitude}`
        const resp = await fetch(url)
        const data = await resp.json()
        return data
    }
}
