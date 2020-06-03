import { createSelector } from '@reduxjs/toolkit'
import moment from 'moment'

import { RootState } from '../store'
import LAYERS from '../../data/layers'
import { DailyForecast } from '../../types/weather'
import { CH_TYPES } from '../../types/chart'
import { Discussion } from '../../types/forecast'
import Emoji from '../../data/emoji'

// MAP
export const selectLayerUrl = (state: RootState) => state.map.layerUrl

// LOCATION
export const selectCoords = (state: RootState) => state.location.coords

// WEATHER
export const selectCurrentWeather = (state: RootState) => state.weather.current
export const selectDailyForecast = (state: RootState): DailyForecast | undefined => state.weather.dailyForecast

// CHARTS
export const selectCurrentChart = (chart: keyof CH_TYPES) => (state: RootState): string | undefined => state.chart[chart]

// FORECAST
export const selectForecastDiscussion = (state: RootState): Discussion | undefined => state.forecast.discussion
export const selectDaysAhead = (state: RootState): number => state.forecast.daysAhead
export const selectDetailed = (state: RootState): any | undefined => {
    if (state.forecast.detailed) {
        return Object.values(state.forecast.detailed)
    }
    return []
}

// CLIMATE
export const selectNorms = (state: RootState): any | undefined => state.climate.norms
export const selectAlmanac = (state: RootState): any | undefined => state.climate.almanac
export const selectAstronomy = (state: RootState): any | undefined => state.climate.astronomy
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
            return [ visibleLight, lengthOfDay ]
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
            const minutes = duration.minutes()
            const seconds = duration.seconds()
            const minuteLabel = minutes === 1 ? 'minute' : 'minutes'
            const secondsLabel = seconds === 1 ? 'second' : 'seconds'
            return `Tomorrow will be ${minutes} ${minuteLabel} ${seconds} ${secondsLabel} ${compareLabel}`
        }
    }
)

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
  lastQuarterr: {
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
            return [ fractionIlluminated, phase ]
        }
        return []
    }
)

export const selectAllLayers = () => Object.values(LAYERS).reduce((fullList: Array<any>, layerType: any) => {
    const nextListChunk = layerType.layers.map(({ id, name }: any) => {
        const layerName = layerType.name === name ? name : `${layerType.name}: ${name}`
        return { layerTypeId: layerType.id, layerId: id, key: `${layerType.id}_${id}`, name: layerName }
    })
    return [...fullList, ...nextListChunk]
}, [])

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
