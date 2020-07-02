import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import toastr from 'toastr'

import { AppThunk } from '../store'
import api from '../../api'

interface ModelState {
    current?: string
}

const initialState: ModelState = {
    current: undefined,
}

export const model = createSlice({
    name: 'model',
    initialState,
    reducers: {
        setCurrent: (state, action: PayloadAction<string>) => {
            state.current = action.payload
        }
    }
})

export const { setCurrent } = model.actions

export const getModelGuidance = (model: string, product: string, forecastHour: string): AppThunk => async (dispatch: any) => {
    try {
        const imageUrl = await api.weather.getModelGuidance(model, product, forecastHour)
        dispatch(setCurrent(imageUrl))
    } catch (err) {
        console.log({ err })
        toastr.error(`Could not get model guidance for ${model}`)
    } 
}


export default model.reducer
