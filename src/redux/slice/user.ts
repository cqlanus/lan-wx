import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import toastr from 'toastr'

import api from '../../api'
import { selectUser } from '../selectors';
import { getAuthUser } from './auth';

interface UserState {
    current: any
}

const initialState: UserState = {
    current: undefined
}

export const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.current = action.payload
        }
    }
})

export const { setUser } = user.actions

export const createUser = (username: string) => async ( dispatch: any ) => {
    try {
        const created = await api.user.create(username)
        dispatch(setUser(created))
    } catch (err) {
        console.log({ err })
        toastr.error(`Could not create user ${username}`)
    }
}

export const getUser = (username: string) => async ( dispatch: any ) => {
    try {
        const found = await api.user.get(username)
        if (found) {
            dispatch(setUser(found))
        } else {
            dispatch(createUser(username))
        }
    } catch (err) {
        console.log({ err })
        toastr.error(`Could not get user ${username}`)
    }
}

export const favoriteStation = (icao: string) => async (dispatch: any, getState: any) => {
    try {
        const mlidStation = await api.station.get(icao)
        const user = selectUser(getState())
        if (!user) { return }
        await api.user.favoriteStation(user.username, mlidStation.id)
        dispatch(getAuthUser())
    } catch (err) {
        console.log({ err })
        toastr.error(`Could not favorite station ${icao}`)
    }
}

export default user.reducer
