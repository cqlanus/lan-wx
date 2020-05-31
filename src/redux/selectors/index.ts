import { createSelector } from '@reduxjs/toolkit'
import moment from 'moment'

import { RootState } from '../store'
import LAYERS from '../../data/layers'
import { DailyForecast } from '../../types/weather'
import { CH_TYPES } from '../../types/chart'
import { Discussion } from '../../types/forecast'

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
