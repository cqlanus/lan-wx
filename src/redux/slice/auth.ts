import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import toastr from 'toastr'

import api from '../../api'
import { getUser } from './user'

interface AuthState {
    authUser: any
}

const initialState: AuthState = {
    authUser: undefined
}

export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthUser: (state, action: PayloadAction<any>) => {
            state.authUser = action.payload
        }
    }
})

export const { setAuthUser } = auth.actions

export const getAuthUser = () => async ( dispatch: any ) => {
    try {
        const authUser = await api.auth.getAuthUser()
        dispatch(setAuthUser(authUser))
        const { username } = authUser
        dispatch(getUser(username))
    } catch (err) {
        console.log({ err })
        toastr.error('Could not get auth user')
    }
}

export const logout = () => async ( dispatch: any ) => {
    try {
        await api.auth.logout()
        dispatch(setAuthUser(undefined))
    } catch (err) {
        console.log({ err })
        toastr.error('Could not log out')
    } 
}

export default auth.reducer
