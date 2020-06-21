import Location from './services/location'
import MapService from './services/map'
import WeatherService from './services/weather'
import ClimateService from './services/climate'
import PWSService from './services/pws'

type ApiConfig = {
    Location: Location,
    Map: MapService
    Weather: WeatherService
    Climate: ClimateService
    PWS: PWSService
}

class API {
    location: Location
    map: MapService
    weather: WeatherService
    climate: ClimateService
    pws: PWSService

    constructor(config: ApiConfig) {
        this.location = config.Location
        this.map = config.Map
        this.weather = config.Weather
        this.climate = config.Climate
        this.pws = config.PWS
    }
}

const config: ApiConfig = {
    Location: new Location(),
    Map: new MapService(),
    Weather: new WeatherService(),
    Climate: new ClimateService(),
    PWS: new PWSService(),
}
const api = new API(config)
export default api
