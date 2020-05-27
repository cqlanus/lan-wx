import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppThunk } from '../store'
import { selectCoords } from '../selectors'
import api from '../../api'
import { CurrentWeather, DailyForecast } from '../../types/weather'

interface WeatherState {
    current?: CurrentWeather,
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
        }
    }
})

export const { setCurrentWeather, setDailyForecast } = weather.actions

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
        dispatch(setCurrentWeather(undefined))
    }
}

export const getDailyForecast = (): AppThunk => async(dispatch, getState) => {
    try {
        const coords = selectCoords(getState())
        if (!coords) { return }
        const dailyForecast = await api.weather.getDailyForecast(coords)
        dispatch(setDailyForecast(dailyForecast))
    } catch (err) {
        console.log({ err })
        dispatch(setDailyForecast(undefined))
    }
}

export default weather.reducer
