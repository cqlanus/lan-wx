import { createSelector } from '@reduxjs/toolkit'
import moment from 'moment'
import {
    compose,
    last,
    pathOr,
    split,
    map,
    prop,
} from 'ramda'

import { RootState } from '../store'
import LAYERS from '../../data/layers'
import { DailyForecast, CurrentWeatherResponse, CurrentWeather, CloudLayer, NWSValue } from '../../types/weather'
import { Device } from '../../types/pws'
import { CH_TYPES } from '../../types/chart'
import { Discussion } from '../../types/forecast'
import Emoji from '../../data/emoji'
import { normalizeForecastUnits, parseDeviceWeather } from '../../utils/weather'
import { parseAstronomyPosition } from '../../utils/astronomy'
import { differenceInMilliseconds } from 'date-fns'
import { AQI } from '../../types/astronomy'
import { convertUnits } from '../../utils/units'
import { weather } from '../slice/weather'

// MAP
export const selectLayerUrl = (state: RootState) => state.map.layerUrl
export const selectLayerTypeId = (state: RootState) => state.map.layerTypeId
export const selectLayerId = (state: RootState) => state.map.layerId
export const selectMapData = (state: RootState) => state.map
export const selectLegendUrl = (state: RootState) => state.map.legendUrl
export const selectCurrentLayerType = (layerTypeId: string) => () => LAYERS[layerTypeId]
export const selectCurrentLayer = (layerTypeId: string, layerId: string) => () => {
    const layerType = selectCurrentLayerType(layerTypeId)()
    if (layerType) {
        const { layers } = layerType
        return layers.find(({ id }) => layerId === id)
    }
}

// LOCATION
export const selectCoords = (state: RootState) => state.location.coords

// WEATHER
export const selectCurrentWeather = (state: RootState) => state.weather.current
export const selectDailyForecast = (state: RootState): DailyForecast | undefined => state.weather.dailyForecast
export const selectRecentWeather = (state: RootState) => state.weather.recent
export const selectRecentTemps = createSelector(
    [selectRecentWeather],
    (recent: CurrentWeather[] | undefined) => {
        if (!recent) { return [] }
        return recent.map(({ temperature, timestamp }) => ({
            temperature,
            timestamp
        }))
    }
)
export const selectZoneId: any = createSelector(
    [selectCurrentWeather],
    (weather: CurrentWeather | undefined) => {
        if (!weather) { return '' }
        return compose(
            last,
            split('/'),
            pathOr('', ['station', 'forecast']),
        )(weather)

    }
)
export const selectAlerts = compose(
    map(prop('properties')),
    pathOr([], ['weather', 'alerts',]),
)

// CHARTS
export const selectCurrentChart = (chart: keyof CH_TYPES) => (state: RootState): string | undefined => state.chart[chart]

// FORECAST
export const selectForecastDiscussion = (state: RootState): Discussion | undefined => state.forecast.discussion
export const selectDaysAhead = (state: RootState): number => state.forecast.daysAhead
export const selectDetailed = (state: RootState): any | undefined => {
    if (state.forecast.detailed) {
        const forecastItems: Array<CurrentWeatherResponse> = Object.values(state.forecast.detailed)
        const normalized = normalizeForecastUnits(forecastItems)
        return normalized
    }
    return []
}

// CLIMATE
export const selectNorms = (state: RootState): any | undefined => state.climate.norms
export const selectAlmanac = (state: RootState): any | undefined => state.climate.almanac
export const selectAstronomyData = (state: RootState): any | undefined => state.climate.astronomy
export const selectAstronomy = createSelector(
    [selectAstronomyData],
    (astroData) => {

        return astroData
    }
)
export const selectAstronoyPosition = createSelector(
    [selectAstronomyData],
    (astroData) => {
        if (!astroData) { return }
        return parseAstronomyPosition(astroData)
    }
)
export const selectNormMonth = (state: RootState): number | undefined => state.climate.month
export const selectNormsByMonth = createSelector(
    [selectNorms, selectNormMonth],
    (norms = [], normMonth) => {
        if (normMonth !== undefined && normMonth >= 0) {
            return norms.filter((n: any,) => {
                const { DATE } = n
                const dateStr = `${DATE}-2020`.replace(/-/g, '/')
                const month = moment(dateStr).month()
                const sameMonth = month === normMonth
                return sameMonth
            })
        }
        return norms
    }
)
export const selectDayLengths = createSelector(
    [selectAstronomy],
    (astronomy) => {
        if (astronomy) {
            const { sunrise, sunset, dawn, dusk } = astronomy.times
            const visible = moment(dusk).diff(dawn)
            const visibleDuration = moment.duration(visible)
            const visibleLight = `${visibleDuration.hours()}h ${visibleDuration.minutes()}m`
            const length = moment(sunset).diff(sunrise)
            const lengthDuration = moment.duration(length)
            const lengthOfDay = `${lengthDuration.hours()}h ${lengthDuration.minutes()}m`
            return [visibleLight, lengthOfDay]
        }
        return []
    }
)
export const selectTomorrowLength = createSelector(
    [selectAstronomy],
    (astronomy) => {
        if (astronomy) {
            const { times, tomorrow: { times: tomTimes } } = astronomy
            const { sunrise, sunset } = times
            const { sunrise: tomSunrise, sunset: tomSunset } = tomTimes
            const todayLength = moment(sunset).diff(sunrise)
            const tomorrowLength = moment(tomSunset).diff(tomSunrise)
            const diff = tomorrowLength - todayLength
            const duration = moment.duration(diff)
            const compareLabel = diff > 0 ? 'longer' : 'shorter'
            const minutes = Math.abs(duration.minutes())
            const seconds = Math.abs(duration.seconds())
            const minuteLabel = minutes === 1 ? 'minute' : 'minutes'
            const secondsLabel = seconds === 1 ? 'second' : 'seconds'
            return `Tomorrow will be ${minutes} ${minuteLabel} ${seconds} ${secondsLabel} ${compareLabel}`
        }
    }
)

const MOON_QUARTER_MAPPING = ['new', 'firstQuarter', 'full', 'lastQuarter']

const MOON_PHASES: any = {
    'new': {
        name: 'New Moon',
        icon: Emoji.moonPhases.newMoon
    },
    waxingCrescent: {
        name: 'Waxing Crescent',
        icon: Emoji.moonPhases.waxingCrescent,
    },
    firstQuarter: {
        name: 'First Quarter',
        icon: Emoji.moonPhases.firstQuarter,
    },
    waxingGibbous: {
        name: 'Waxing Gibbous',
        icon: Emoji.moonPhases.waxingGibbous
    },
    full: {
        name: 'Full Moon',
        icon: Emoji.moonPhases.fullMoon,
    },
    waningGibbous: {
        name: 'Waning Gibbous',
        icon: Emoji.moonPhases.waningGibbous,
    },
    lastQuarter: {
        name: 'Last Quarter',
        icon: Emoji.moonPhases.lastQuarter,
    },
    waningCrescent: {
        name: 'Waning Crescent',
        icon: Emoji.moonPhases.waningCrescent,
    },
}

export const selectMoonPhase = createSelector(
    [selectAstronomy],
    (astronomy) => {
        if (astronomy) {
            const { fraction, phaseName } = astronomy.moonphase
            const fractionIlluminated = `${(fraction * 100).toFixed(2)}%`
            const phase = MOON_PHASES[phaseName]
            return [fractionIlluminated, phase]
        }
        return []
    }
)

// export const selectTemperatureDeparture = createSelector(
//     [selectNorms, selectRecentTemps],
//     (norms, recent) => {
//         if (!recent) { return [] }
//         const departure = recent.map(day => {
//             const { temperature, timestamp } = day
//             const date = moment(timestamp).format('MM-DD')
//             const foundNorm = norms.find(norm => norm.date === date)
//             if (foundNorm) {
//                 const diff = temperature.value - foundNorm

//             }
//         })
//     }
// )

export const selectInitialLayer = () => {
    const { radar } = LAYERS
    const initArgs = { layerTypeId: radar.id, layerId: radar.layers[0].id, time: moment().toISOString() }
    return initArgs
}

export const selectAllLayers = () => Object.values(LAYERS).reduce((fullList: any, layerType: any) => {
    const nextListChunk = layerType.layers.map(({ id, name }: any) => {
        const layerName = layerType.name === name ? name : `${layerType.name}: ${name}`
        return { layerTypeId: layerType.id, layerId: id, key: `${layerType.id}_${id}`, name: layerName }
    })
    return {
        ...fullList,
        [layerType.name]: nextListChunk,
    }
}, {})

export const selectLayerTypes = () => Object.values(LAYERS)
export const selectLayerIds = createSelector(
    [selectLayerTypeId],
    (layerType) => {
        return LAYERS[layerType].layers
    }
)
// export const selectAllLayers = () => Object.values(LAYERS).reduce((fullList: Array<any>, layerType: any) => {
//     const nextListChunk = layerType.layers.map(({ id, name }: any) => {
//         const layerName = layerType.name === name ? name : `${layerType.name}: ${name}`
//         return { layerTypeId: layerType.id, layerId: id, key: `${layerType.id}_${id}`, name: layerName }
//     })
//     return [...fullList, ...nextListChunk]
// }, [])

export const selectThreeDayForecast = createSelector(
    [selectDailyForecast],
    (dailyForecast: DailyForecast | undefined) => {
        if (!dailyForecast) { return [] }
        const { periods } = dailyForecast
        const maxDate = moment().add(3, 'days').dayOfYear()
        return periods.filter(p => {
            const startDate = moment(p.startTime).dayOfYear()
            const isBefore = startDate < maxDate
            return isBefore
        })
    }
)

export const selectDetailedForecast = createSelector(
    [selectDetailed, selectDaysAhead],
    (detailed, daysAhead) => {
        if (!daysAhead) { return detailed }
        return detailed.filter((d: any) => {
            const maxDate = moment().add(daysAhead, 'days')
            return moment(d.time).isSameOrBefore(maxDate, 'day')
        })
    }
)

export const selectDepartures = createSelector(
    [selectDailyForecast, selectNorms],
    (daily, norms) => {
        if (!daily || !norms) { return [] }
        const { periods } = daily
        const matchingDays = periods.map((p: any) => {
            const { isDaytime, startTime, temperature } = p
            const date = moment(startTime).format('MM-DD')
            const found = norms.find((norm: any) => norm.DATE === date)
            const k = isDaytime ? 'HI' : 'LO'
            const tmax = found ? found['DLY-TMAX-NORMAL'] : null
            const tmin = found ? found['DLY-TMIN-NORMAL'] : null
            const val = isDaytime ? tmax.value : tmin.value
            const departure = Number((temperature - val).toFixed(2))
            return {
                date,
                [`forecast${k}`]: { value: temperature, unit: 'degF' },
                [`departure${k}`]: { value: departure, unit: 'degF' },
                [`normal${k}`]: { value: val, unit: 'degF' },
            }
        }).reduce((acc: { [key: string]: any }, curr) => {
            const { date } = curr
            const existing = acc[date] || {}
            return {
                ...acc,
                [date]: { ...existing, ...curr },
            }
        }, {})
        return Object.values(matchingDays)
    }
)

// PWS
export const selectDeviceInfo = (state: RootState) => state.pws.deviceInfo
export const selectCurrentDeviceWeather = createSelector(
    [selectDeviceInfo],
    (deviceInfo) => {
        if (!deviceInfo) { return }
        const { lastData, info } = deviceInfo
        if (lastData) {
            const parsed = parseDeviceWeather(lastData)
            return { data: parsed, info }
        }
    }
)

// USER
export const selectUser = (state: RootState) => state.user.current
export const selectAuthUser = (state: RootState) => state.auth.authUser
export const selectPwsDevices = createSelector<RootState, any, Device[]>(
    [selectUser],
    (user) => {
        if (!user) { return [] }
        return user.pws || []
    }
)
export const selectCurrentDevice = (state: RootState) => state.pws.current
export const selectHasDevices = createSelector<RootState, any, boolean>(
    [selectPwsDevices],
    (devices) => devices.length > 0
)
export const selectDevWeather = (state: RootState) => state.pws.weather
export const selectDeviceWeather = createSelector(
    [selectDevWeather],
    (deviceWeather) => deviceWeather.map(parseDeviceWeather)
)
export const selectFavoriteStations = createSelector(
    [selectUser],
    (user) => {
        if (!user) { return [] }
        const { stations } = user
        return stations
    }
)
export const selectTheme = (state: RootState) => state.user.theme

export const selectIsStationFavorite = createSelector(
    [selectUser, selectCurrentWeather],
    (user, weather) => {
        if (!weather || !user) { return false }
        const { station: s } = weather
        const { stations } = user
        return stations.some((station: any) => station.icao === s.stationIdentifier)
    }
)

export const selectModelImage = (state: RootState) => state.model.current

// ASTRONOMY
const selectAstronomySlice = (state: RootState) => state.astronomy

export const selectTimes = createSelector(
    selectAstronomySlice,
    astro => astro.times
)

export const selectPositions = createSelector(
    selectAstronomySlice,
    astro => astro.positions
)

export const selectSunSummary = createSelector(
    selectAstronomySlice,
    astro => astro.sun,
)

export const selectMoonSummary = createSelector(
    selectAstronomySlice,
    astro => astro.moon,
)

export const selectMoonPhases = createSelector(
    selectAstronomySlice,
    astro => astro.moonPhase,
)

export const selectCurrentPhaseData = createSelector(
    selectMoonPhases,
    phaseData => {
        if (!phaseData) { return }
        const { phase } = phaseData
        const { illumination, name, value } = phase
        const percentIlluminated = `${(illumination * 100).toFixed(2)}%`
        const { name: displayName, icon } = MOON_PHASES[name]
        return { ...phase, displayName, icon, percentIlluminated, value: `${value.toFixed(2)}°` }
    }
)

export const selectNextPhases = createSelector(
    selectMoonPhases,
    phaseData => {
        if (!phaseData) { return [] }
        return (phaseData.nextQuarters || []).map(({ quarter, date }) => {
            const phaseKey = MOON_QUARTER_MAPPING[quarter]
            const { name, icon } = MOON_PHASES[phaseKey]
            return { name, icon, date }
        })
    }
)


export const selectDayLengthTimeseries = createSelector(
    selectAstronomySlice,
    ({ dayLengthTimeseries }) => {
        if (!dayLengthTimeseries) { return [] }
        return dayLengthTimeseries.map(({ date, times }) => {
            const sunset = new Date(times.sunset)
            const sunrise = new Date(times.sunrise)
            const nightEnd = new Date(times.nightEnd)
            const night = new Date(times.night)
            const day = differenceInMilliseconds(sunset, sunrise)
            const msInOneDay = 1000 * 60 * 60 * 24
            return {
                date,
                days: day,
                inverseDay: msInOneDay - day,
                nights: msInOneDay + differenceInMilliseconds(nightEnd, night),
            }
        })

    }
)

export const selectPositionTimeseries = createSelector(
    selectAstronomySlice,
    ({ positionTimeseries }) => {
        if (!positionTimeseries) { return [] }
        return positionTimeseries.map(({ bodies }) => bodies)
    }
)

/*
 * evaluation of current conditions
 * 1. clouds:
 *   - excellent (3): all CLR
 *   - good (2): all CLR | FEW
 *   - ok (1): all CLR | FEW | SCT
 *   - not good (0): any BKN
 * 2. aqi:
 *   - excellent (3): <10
 *   - good (2): <20
 *   - ok (1): <30
 *   - not good (0): 30+
 * 3. darkness:
 *   - excellent (2): isNight === true
 *   - good (1): isNauticalTwilight === true
 *   - not good (0): isNauticalTwilight === false && isNight === false
 * 4. dewpoint
 *   - excellent (3): dp < 50
 *   - good (2): dp < 60
 *   - ok (1): dp < 70
 *   - not good (1): dp > 70
 * 5. moonPosition
 *   - excellent (3): alt <= 0
 *   - good (2): alt < 20
 *   - ok (1): alt < 30
 *   - not good (0): alt > 30
 * 6. moonPhase
 *   - excellent (3): < 10%
 *   - good (2): < 25%
 *   - ok (1): < 40%
 *   - not good (0) > 40%
 * 
 * 
 */
type Ratings = { excellent: boolean, good: boolean, ok?: boolean, notGood: boolean }
const getRatings = (ratings: Ratings) => {
    return Object.entries(ratings).find(entry => {
        const value = entry[1]
        return value === true
    })
}
const evalDewpoint = ({ value }: NWSValue) => {
    const degF = convertUnits('degC', 'degF', +value)
    const dewpoint = degF.toNumber('degF')
    const excellent = dewpoint < 50
    const good = dewpoint < 60
    const ok = dewpoint < 70
    const notGood = dewpoint >= 70
    const ratings = { excellent, good, ok, notGood }
    return getRatings(ratings)
}
const evalMoonPosition = ({ alt }: { alt: number }) => {
    const excellent = alt <= 0
    const good = alt < 20
    const ok = alt < 30
    const notGood = alt >= 30
    const ratings = { excellent, good, ok, notGood }
    return getRatings(ratings)
}

const evalDarkness = (darkness: { isNauticalTwilight: boolean, isNight: boolean }) => {
    const excellent = darkness.isNight
    const good = darkness.isNauticalTwilight
    const notGood = !(excellent || good)
    const ratings = { excellent, good, notGood }
    return getRatings(ratings)
}
const evalCloudLayers = (layers: CloudLayer[]) => {
    const excellent = layers.every(layer => layer.amount === "CLR")
    const good = layers.every(layer => ['CLR', 'FEW'].includes(layer.amount))
    const ok = layers.every(layer => ['CLR', 'FEW', 'SCT'].includes(layer.amount))
    const notGood = layers.some(layer => ['BKN', 'OVC'].includes(layer.amount))
    const ratings = { excellent, good, ok, notGood }
    return getRatings(ratings)
}
const evalAqi = (data: AQI) => {
    const aqi = parseFloat(data.value)
    const excellent = aqi < 10
    const good = aqi < 20
    const ok = aqi <= 30
    const notGood = aqi > 30

    const ratings = { excellent, good, ok, notGood }
    return getRatings(ratings)
}

type EvalFn = (arg: any) => any
const CONDITION_EVALUATIONS: { [key: string]: EvalFn } = {
    cloudLayers: evalCloudLayers,
    aqi: evalAqi,
    darkness: evalDarkness,
    moonPosition: evalMoonPosition,
    dewpoint: evalDewpoint,
}

export const selectCurrentAstroConditions = createSelector(
    selectAstronomySlice,
    ({ currentConditions }) => {
        if (!currentConditions) { return }
        return Object.entries(currentConditions).reduce((acc, entry) => {
            const [key, value] = entry;
            const evalFn = CONDITION_EVALUATIONS[key]
            const ratings = evalFn ? evalFn(value) : null
            return {
                ...acc,
                [key]: { ratings, value }
            }
        }, {})
    })

export const selectAstroForecast = createSelector(
    selectAstronomySlice,
    ({ forecast }) => forecast
)
