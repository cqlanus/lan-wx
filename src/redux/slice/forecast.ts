import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppThunk } from '../store'
import api from '../../api'
import { selectCoords } from '../selectors'
import type { Discussion } from '../../types/forecast'

interface ForecastState {
    discussion?: Discussion,
    hourly?: any,
    grid?: any,
}

const initialState: ForecastState = {
    discussion: undefined,
    hourly: undefined,
    grid: undefined,
}

export const forecast = createSlice({
    name: 'forecast',
    initialState,
    reducers: {
        setDiscussion: (state, action: PayloadAction<any>) => {
            state.discussion = action.payload
        }
    }
})

export const { setDiscussion } = forecast.actions

export const getForecastDiscussion = (): AppThunk => async (dispatch, getState) => {
    try {
        const coords = selectCoords(getState())
        if (!coords) { return }
        const discussion = await api.weather.getForecastDiscussion(coords)
        dispatch(setDiscussion(discussion))
    } catch (err) {
        console.log({err})
        dispatch(setDiscussion(undefined))
    }
}

export default forecast.reducer
