import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppThunk } from '../store'
import { selectCoords } from '../selectors'
import api from '../../api'

interface WeatherState {
    current: any
}

const initialState: WeatherState = {
    current: undefined
}

export const weather = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setCurrentWeather: (state, action: PayloadAction<any>) => {
            state.current = action.payload
        }
    }
})

export const { setCurrentWeather } = weather.actions

// THUNKS
export const getCurrentWeather = (): AppThunk => async (dispatch, getState) => {
    try {
        const coords = selectCoords(getState())
        if (!coords) { return }
        const currentWeather = await api.weather.getCurrentConditions(coords)
        dispatch(setCurrentWeather(currentWeather))
    } catch (err) {
        console.log({ err })
        dispatch(setCurrentWeather(undefined))
    }
}

export default weather.reducer
