export type NWSValue = { value: number | string, unitCode: string }
export type WeatherValue = { value: number, unit: string }

export type NWSStation = {
    stationIdentifier: string,
    name: string,
}

export type CloudLayer = {
    amount: "FEW" | "SCT" | "BKN" | "CLR" | "OVC",
    base: {
        unitCode: string,
        value: number | null
    }
}

export type CurrentWeatherResponse = {
    elevation: NWSValue,
    temperature: NWSValue,
    dewpoint: NWSValue,
    windDirection: NWSValue,
    barometricPressure: NWSValue,
    seaLevelPressure: NWSValue,
    visibility: NWSValue,
    relativeHumidity: NWSValue,
    station: NWSStation,
    textDescription: string,
    cloudLayers: CloudLayer[],
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
    station: NWSStation,
    textDescription: string,
    cloudLayers: any,
    icon: string,
    timestamp: string,
}

export type Period = {
    name: string,
    icon: string,
    number: number,
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
    periods: Array<Period>,
    updated: string,
}

export type DeviceWeather = {
    dateutc: number,
    tempinf: number,
    humidityin: number,
    baromrelin: number,
    baromabsin: number,
    tempf: number,
    humidity: number,
    winddir: number,
    windspeedmph: number,
    windgustmph: number,
    maxdailygust: number,
    hourlyrainin: number,
    eventrainin: number,
    dailyrainin: number,
    weeklyrainin: number,
    monthlyrainin: number,
    totalrainin: number,
    solarradiation: number,
    uv: number,
    feelsLike: number,
    dewPoint: number,
    feelsLikein: number,
    dewPointin: number,
    lastRain: string,
    date: string,
}
