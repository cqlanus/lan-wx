import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppThunk } from '../store'
import api from '../../api'
import { selectCoords } from '../selectors'

interface ClimateState {
    norms?: any,
    normsTypes?: any,
    almanac?: any,
    astronomy?: any,
}

const initialState: ClimateState = {
    norms: undefined,
    normsTypes: undefined,
    almanac: undefined,
    astronomy: undefined
}

export const climate = createSlice({
    name: 'climate',
    initialState,
    reducers: {
        setNorms: (state, action: PayloadAction<any>) => {
            const { data, types } = action.payload
            state.norms = data
            state.normsTypes = types
        },
        setAlmanac: (state, action: PayloadAction<any>) => {
            state.almanac = action.payload
        },
        setAstronomy: (state, action: PayloadAction<any>) => {
            state.astronomy = action.payload
        }
    }
})

export const { setNorms, setAlmanac, setAstronomy } = climate.actions

export const getNorms = (): AppThunk => async (dispatch, getState) => {
    try {
        const coords = selectCoords(getState())
        if (!coords) { return }
        const norms = await api.climate.getNorms(coords)
        dispatch(setNorms(norms))
    } catch (err) {
        console.log({ err })
        dispatch(setNorms(undefined))
    }
}

export const getAlmanac = (): AppThunk => async (dispatch, getState) => {
    try {
        const coords = selectCoords(getState())
        if (!coords) { return }
        const almanac = await api.climate.getAlmanac(coords)
        dispatch(setAlmanac(almanac))
    } catch (err) {
        console.log({ err })
        dispatch(setAlmanac(undefined))
    }
}

export const getAstronomy = (): AppThunk => async (dispatch, getState) => {
    try {
        const coords = selectCoords(getState())
        if (!coords) { return }
        const astronomy = await api.climate.getAstronomy(coords)
        dispatch(setAstronomy(astronomy))
    } catch (err) {
        console.log({ err })
        dispatch(setAstronomy(undefined))
    }
}

export default climate.reducer
