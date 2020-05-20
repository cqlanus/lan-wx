import Location from './services/location'
import MapService from './services/map'
import WeatherService from './services/weather'

type ApiConfig = {
    Location: Location,
    Map: MapService
    Weather: WeatherService
}

class API {
    location: Location
    map: MapService
    weather: WeatherService

    constructor(config: ApiConfig) {
        this.location = config.Location
        this.map = config.Map
        this.weather = config.Weather
    }
}

const config: ApiConfig = {
    Location: new Location(),
    Map: new MapService(),
    Weather: new WeatherService(),
}
const api = new API(config)
export default api
