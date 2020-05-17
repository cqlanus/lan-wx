import Location from './services/location'
import MapService from './services/map'

type ApiConfig = {
    Location: Location,
    Map: MapService
}

class API {
    location: Location
    map: MapService

    constructor(config: ApiConfig) {
        this.location = config.Location
        this.map = config.Map
    }
}

const config: ApiConfig = {
    Location: new Location(),
    Map: new MapService(),
}
const api = new API(config)
export default api
