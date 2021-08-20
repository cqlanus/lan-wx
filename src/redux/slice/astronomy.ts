import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppThunk } from '../store'
import api from '../../api'
import { selectCoords } from '../selectors'
import type {
    BodyTimes,
    BodyPositions,
    SunSummary,
    MoonSummary,
    MoonPhaseData,
    DayLength,
    CurrentAstroConditions,
    AstroForecast,
} from '../../types/astronomy'

interface AstronomyState {
    times?: BodyTimes,
    positions?: BodyPositions,
    sun?: SunSummary,
    moon?: MoonSummary,
    moonPhase?: MoonPhaseData,
    dayLengthTimeseries?: DayLength[],
    positionTimeseries?: BodyPositions[],
    currentConditions?: CurrentAstroConditions,
    forecast?: AstroForecast,
}

const initialState: AstronomyState = {
    times: undefined,
    positions: undefined,
    sun: undefined,
    moon: undefined,
    moonPhase: undefined,
    dayLengthTimeseries: undefined,
    positionTimeseries: undefined,
    currentConditions: undefined,
    forecast: undefined,
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
        },
        setSunSummary: (state, action: PayloadAction<SunSummary | undefined>) => {
            state.sun = action.payload
        },
        setMoonSummary: (state, action: PayloadAction<MoonSummary | undefined>) => {
            state.moon = action.payload
        },
        setMoonPhases: (state, action: PayloadAction<MoonPhaseData | undefined>) => {
            state.moonPhase = action.payload
        },
        setDaylengthTimeseries: (state, action: PayloadAction<DayLength[] | undefined>) => {
            state.dayLengthTimeseries = action.payload
        },
        setPositionTimeseries: (state, action: PayloadAction<BodyPositions[] | undefined>) => {
            state.positionTimeseries = action.payload
        },
        setCurrentAstroConditions: (state, action: PayloadAction<CurrentAstroConditions | undefined>) => {
            state.currentConditions = action.payload
        },
        setAstroForecast: (state, action: PayloadAction<AstroForecast | undefined>) => {
            state.forecast = action.payload
        }
    }
})

export const {
    setTimes,
    setPositions,
    setSunSummary,
    setMoonSummary,
    setMoonPhases,
    setDaylengthTimeseries,
    setPositionTimeseries,
    setCurrentAstroConditions,
    setAstroForecast,
} = astronomy.actions

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

export const getPositions = (time: Date): AppThunk => async (dispatch, getState) => {
    try {
        const coords = selectCoords(getState())
        if (!coords) { return }
        const positions = await api.astronomy.getPositions(coords, time)
        dispatch(setPositions(positions))
    } catch (err) {
        console.log({ err })
        dispatch(setPositions(undefined))
    }
}

export const getSunSummary = (): AppThunk => async (dispatch, getState) => {
    try {
        const coords = selectCoords(getState())
        if (!coords) { return }
        const sunSummary = await api.astronomy.getSunSummary(coords)
        dispatch(setSunSummary(sunSummary))
    } catch (err) {
        console.log({ err })
        dispatch(setSunSummary(undefined))
    }
}

export const getMoonSummary = (): AppThunk => async (dispatch, getState) => {
    try {
        const coords = selectCoords(getState())
        if (!coords) { return }
        const moonSummary = await api.astronomy.getMoonSummary(coords)
        dispatch(setMoonSummary(moonSummary))
    } catch (err) {
        console.log({ err })
        dispatch(setMoonSummary(undefined))
    }
}

export const getMoonPhases = (): AppThunk => async (dispatch, getState) => {
    try {
        const coords = selectCoords(getState())
        if (!coords) { return }
        const moonPhases = await api.astronomy.getMoonPhases(coords)
        dispatch(setMoonPhases(moonPhases))
    } catch (err) {
        console.log({ err })
        dispatch(setMoonSummary(undefined))
    }
}

export const getDayLengths = (): AppThunk => async (dispatch, getState) => {
    try {
        const coords = selectCoords(getState())
        if (!coords) { return }
        const daylengths = await api.astronomy.getDayLengths(coords)
        dispatch(setDaylengthTimeseries(daylengths))
    } catch (err) {
        console.log({ err })
        dispatch(setDaylengthTimeseries(undefined))
    }
}

export const getPositionTimeseries = (): AppThunk => async (dispatch, getState) => {
    try {
        const coords = selectCoords(getState())
        if (!coords) { return }
        const positions = await api.astronomy.getPositionTimeseries(coords)
        dispatch(setPositionTimeseries(positions))
    } catch (err) {
        console.log({ err })
        dispatch(setPositionTimeseries(undefined))
    }
}

export const getCurrentAstroConditions = (): AppThunk => async (dispatch, getState) => {
    try {
        const coords = selectCoords(getState())
        if (!coords) { return }
        const conditions = await api.astronomy.getCurrentAstroConditions(coords)
        dispatch(setCurrentAstroConditions(conditions))
        
    } catch (err) {
        console.log({ err })
        dispatch(setCurrentAstroConditions(undefined))
    } 
}

export const getAstroForecast = (): AppThunk => async (dispatch, getState) => {
    try {
        const coords = selectCoords(getState())
        if (!coords) { return }
        const forecast = await api.astronomy.getAstroForecast(coords)
        dispatch(setAstroForecast(forecast))
        
    } catch (err) {
        console.log({ err })
        dispatch(setAstroForecast(undefined))
    } 
}

export default astronomy.reducer
