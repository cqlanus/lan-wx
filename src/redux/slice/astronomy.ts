import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppThunk } from '../store'
import api from '../../api'
import { selectCoords } from '../selectors'
import type { BodyTimes, BodyPositions } from '../../types/astronomy'

interface AstronomyState {
    times?: BodyTimes,
    positions?: BodyPositions,
}

const initialState: AstronomyState = {
    times: undefined,
    positions: undefined,
}

export const astronomy = createSlice({
    name: 'astronomy',
    initialState,
    reducers: {
        setTimes: (state, action: PayloadAction<BodyTimes | undefined>) => {
            state.times = action.payload
        },
        setPositions: (state, action: PayloadAction<BodyPositions | undefined>) => {
            state.positions = action.payload
        }
    }
})

export const { setTimes, setPositions } = astronomy.actions

export const getTimes = (): AppThunk => async (dispatch, getState) => {
    try {
        const coords = selectCoords(getState())
        if (!coords) { return }
        const times = await api.astronomy.getTimes(coords)
        dispatch(setTimes(times))
    } catch (err) {
        console.log({ err })
        dispatch(setTimes(undefined))
    } 
}

export const getPositions = (): AppThunk => async (dispatch, getState) => {
    try {
        const coords = selectCoords(getState())
        if (!coords) { return }
        const positions = await api.astronomy.getPositions(coords)
        dispatch(setPositions(positions))
    } catch (err) {
        console.log({ err })
        dispatch(setPositions(undefined))
    } 
}

export default astronomy.reducer
