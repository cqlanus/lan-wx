import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppThunk } from '../store'
import api from '../../api'
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
        }
    }
})

export const { setUpperAir, setSkewT } = chart.actions


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

const CHART_TYPES: CH_TYPES = {
    upperAir: getUpperAir,
    skewT: getUpperAir,
    surface: () => {}
}

export const getChart = (chartType: keyof CH_TYPES, args: any): AppThunk => dispatch => {
    const thunk = CHART_TYPES[chartType]
    dispatch(thunk(args))

}

export default chart.reducer
