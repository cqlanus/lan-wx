import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import toastr from 'toastr'

import { AppThunk } from '../store'
import { selectCoords } from '../selectors'
import api from '../../api'
import { CurrentWeather, DailyForecast } from '../../types/weather'

interface WeatherState {
    current?: CurrentWeather,
    recent?: CurrentWeather[],
    dailyForecast?: DailyForecast
}

const initialState: WeatherState = {
    current: undefined,
    dailyForecast: undefined
}

export const weather = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setCurrentWeather: (state, action: PayloadAction<CurrentWeather | undefined>) => {
            state.current = action.payload
        },
        setDailyForecast: (state, action: PayloadAction<DailyForecast | undefined>) => {
            state.dailyForecast = action.payload
        },
        setRecentWeather: (state, action: PayloadAction<CurrentWeather[] | undefined>) => {
            state.recent = action.payload
        }
    }
})

export const { setCurrentWeather, setDailyForecast, setRecentWeather } = weather.actions

// THUNKS
export const getCurrentWeather = (): AppThunk => async (dispatch, getState) => {
    try {
        const state = getState()
        const coords = selectCoords(state)
        if (!coords) { return }
        const currentWeather = await api.weather.getCurrentConditions(coords)
        dispatch(setCurrentWeather(currentWeather))
    } catch (err) {
        console.log({ err })
        toastr.error('Could not get current weather')
    }
}

export const getRecentWeather = (limit?: number): AppThunk => async (dispatch, getState) => {
    try {
        const state = getState()
        const coords = selectCoords(state)
        if (!coords) { return }
        const recentWeather = await api.weather.getRecentConditions(coords, limit)
        dispatch(setRecentWeather(recentWeather))
    } catch (err) {
        console.log({ err })
        toastr.error('Could not get recent weather')
    }
}

export const getDailyForecast = (): AppThunk => async (dispatch, getState) => {
    try {
        const coords = selectCoords(getState())
        if (!coords) { return }
        const dailyForecast = await api.weather.getDailyForecast(coords)
        dispatch(setDailyForecast(dailyForecast))
    } catch (err) {
        console.log({ err })
        toastr.error('Could not get daily forecast')

    }
}

export default weather.reducer
