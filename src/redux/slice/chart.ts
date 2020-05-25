import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppThunk } from '../store'
import api from '../../api'
import { selectCoords } from '../selectors'
import type { CH_TYPES } from '../../types/chart'

interface ChartState {
    upperAir?: string,
    skewT?: string,
    surface?: string
}

const initialState: ChartState = {
    upperAir: undefined,
    skewT: undefined,
    surface: undefined,
}

export const chart = createSlice({
    name: 'chart',
    initialState,
    reducers: {
        setUpperAir: (state, action: PayloadAction<string | undefined>) => {
            state.upperAir = action.payload
        },
        setSkewT: (state, action: PayloadAction<string | undefined>) => {
            state.skewT = action.payload
        },
        setSurface: (state, action: PayloadAction<string | undefined>) => {
            state.surface = action.payload
        }
    }
})

export const { setUpperAir, setSkewT, setSurface } = chart.actions


type UpperAirArgs = { isobar: string, timeOfDay: string }
export const getUpperAir = ({ isobar, timeOfDay }: UpperAirArgs): AppThunk => async (dispatch) => {
    try {
        const upperAirUrl = await api.weather.getUpperAirChart(isobar, timeOfDay)
        dispatch(setUpperAir(upperAirUrl))
    } catch (err) {
        console.log({ err })
        dispatch(setUpperAir(undefined))
    }
}

type SkewTArgs = { timeOfDay: string }
export const getSkewT = ({ timeOfDay }: SkewTArgs): AppThunk => async (dispatch, getState) => {
    try {
        const coords = selectCoords(getState())
        if (!coords) { return }
        const skewTUrl = await api.weather.getSkewTChart(coords, timeOfDay)
        dispatch(setSkewT(skewTUrl))
    } catch (err) {
        console.log({ err })
        dispatch(setSkewT(undefined))
    }
}

type SurfaceArgs = { timeOfDay: string, surfaceObservations: boolean }
export const getSurfaceAnalysis = ({ timeOfDay, surfaceObservations }: SurfaceArgs) => async (dispatch: any) => {
    try {
        const surfaceUrl = await api.weather.getSurfaceChart(timeOfDay, surfaceObservations)
        dispatch(setSurface(surfaceUrl))
    } catch (err) {
        console.log({ err })
        dispatch(setSurface(undefined))
    }
}

const CHART_TYPES: CH_TYPES = {
    upperAir: getUpperAir,
    skewT: getSkewT,
    surface: getSurfaceAnalysis,
}

export const getChart = (chartType: keyof CH_TYPES, args: any): AppThunk => dispatch => {
    const thunk = CHART_TYPES[chartType]
    dispatch(thunk(args))

}

export default chart.reducer
