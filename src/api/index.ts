import Location from './services/location'

type ApiConfig = {
    Location: Location
}

class API {
    location: Location

    constructor(config: ApiConfig) {
        this.location = config.Location
    }
}

const config: ApiConfig = {
    Location: new Location()
}
const api = new API(config)
export default api
