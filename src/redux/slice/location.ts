import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk } from '../store'
import type { Coords } from '../../types/location'
import api from '../../api'

interface LocationState {
    coords?: Coords
}

const initialState: LocationState = {
    /* coords: { latitude: 41, longitude: -87 } */
    coords: undefined
}

export const location = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setLocation: (state, action: PayloadAction<Coords>) => {
            state.coords = action.payload
        }
    }
})

export const { setLocation } = location.actions

// THUNKS
export const getCurrentLocation = (): AppThunk => async dispatch => {
    try {
        const { coords } = await api.location.getLocation()
        const { latitude, longitude } = coords
        dispatch(setLocation({ latitude, longitude }))
    } catch (err) {
        console.log(err)
    }
}

export default location.reducer
