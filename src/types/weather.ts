export type NWSValue = { value: number, unitCode: string }
export type WeatherValue = { value: number, unit: string }

export type CurrentWeatherResponse = {
    elevation: NWSValue,
    temperature: NWSValue,
    dewpoint: NWSValue,
    windDirection: NWSValue,
    barometricPressure: NWSValue,
    seaLevelPressure: NWSValue,
    visibility: NWSValue,
    relativeHumidity: NWSValue,
    station: string,
    textDescription: string,
    cloudLayers: any,
    icon: string,
    timestamp: string,
}

export type CurrentWeather = {
    elevation: WeatherValue,
    temperature: WeatherValue,
    dewpoint: WeatherValue,
    windDirection: WeatherValue,
    barometricPressure: WeatherValue,
    seaLevelPressure: WeatherValue,
    visibility: WeatherValue,
    relativeHumidity: WeatherValue,
    station: string,
    textDescription: string,
    cloudLayers: any,
    icon: string,
    timestamp: string,
}

type Period = {
    startTime: string,
    endTime: string,
    isDaytime: boolean,
    temperature: number,
    temperatureUnit: string,
    temperatureTrend: string,
    windSpeed: string,
    windDirection: string,
    shortForecast: string,
    detailedForecast: string
}
export type DailyForecast = {
    periods: Array<Period>
}
