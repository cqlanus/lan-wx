import Location from './services/location'
import MapService from './services/map'
import WeatherService from './services/weather'
import ClimateService from './services/climate'
import PWSService from './services/pws'
import UserService from './services/user'
import AuthService from './services/auth'

type ApiConfig = {
    Location: Location,
    Map: MapService
    Weather: WeatherService
    Climate: ClimateService
    PWS: PWSService
    User: UserService
    Auth: AuthService
}

class API {
    location: Location
    map: MapService
    weather: WeatherService
    climate: ClimateService
    pws: PWSService
    user: UserService
    auth: AuthService

    constructor(config: ApiConfig) {
        this.location = config.Location
        this.map = config.Map
        this.weather = config.Weather
        this.climate = config.Climate
        this.pws = config.PWS
        this.user = config.User
        this.auth = config.Auth
    }
}

const config: ApiConfig = {
    Location: new Location(),
    Map: new MapService(),
    Weather: new WeatherService(),
    Climate: new ClimateService(),
    PWS: new PWSService(),
    User: new UserService(),
    Auth: new AuthService(),
}
const api = new API(config)
export default api
