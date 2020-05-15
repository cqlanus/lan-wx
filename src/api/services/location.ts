import type { Coords } from '../../types/location'

export default class Location {
    getLocation = (): Promise<{ coords: Coords }> => {
        const { geolocation } = navigator
        return new Promise((res, rej) => {
            return geolocation.getCurrentPosition(res, rej)
        })
    }
}
