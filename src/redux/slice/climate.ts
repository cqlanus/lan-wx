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
        }
    }
})

export const { setNorms } = climate.actions

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

export default climate.reducer
