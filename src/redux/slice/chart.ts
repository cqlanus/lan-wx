import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import moment from 'moment'

import { AppThunk } from '../store'
import api from '../../api'
import { selectCoords } from '../selectors'
import type { CH_TYPES } from '../../types/chart'

interface ChartState {
    upperair?: string,
    skewt?: string,
    surface?: string
}

const initialState: ChartState = {
    upperair: undefined,
    skewt: undefined,
    surface: undefined,
}

export const chart = createSlice({
    name: 'chart',
    initialState,
    reducers: {
        setUpperAir: (state, action: PayloadAction<string | undefined>) => {
            state.upperair = action.payload
        },
        setSkewT: (state, action: PayloadAction<string | undefined>) => {
            state.skewt = action.payload
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
        const today = moment().format('YYYY-MM-DD')
        const skewTUrl = await api.weather.getSkewTChart(coords, today, timeOfDay)
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
    upperair: getUpperAir,
    skewt: getSkewT,
    surface: getSurfaceAnalysis,
}

export const getChart = (chartType: keyof CH_TYPES, args: any): AppThunk => dispatch => {
    const thunk = CHART_TYPES[chartType]
    dispatch(thunk(args))

}

export default chart.reducer
