import CONFIG from './config/vars'

export const getConfigVar = (configVar: string) => {
    const { NODE_ENV, REACT_APP_LOCAL } = process.env
    const env = NODE_ENV === 'production' ? 'prod'
        : REACT_APP_LOCAL ? 'local'
            : 'dev'
    return CONFIG[env][configVar]
}

export const request = async (url: string, options?: any) => {
    const response = await fetch(url, options)
    const json = await response.json()
    if (response.ok) {
        return json
    } else {
        throw json
    }
}

export const formatUtcHour = (hour: number, len: number = 3) => {
    let forecastHour = `${hour}`
    let length = forecastHour.length
    while (length < len) {
        forecastHour = `0${forecastHour}`
        length = forecastHour.length
    }
    return forecastHour
}
