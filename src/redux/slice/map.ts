import { createSlice } from '@reduxjs/toolkit';

import { AppThunk } from '../store'
import api from '../../api'
import LAYERS from '../../data/layers'

interface MapState {
    layerUrl: string,
    error?: string
}

const { radar } = LAYERS
const initArgs = { layerTypeId: radar.id, layerId: radar.layers[0].id }
const initLayer = api.map.selectLayerUrl(initArgs)
const initialState: MapState = {
    layerUrl: initLayer
}

export const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setLayerUrl: (state, action) => {
            state.layerUrl = action.payload
            state.error = undefined
        },
        setMapError: (state, action) => {
            state.error = action.payload
        }
    }
})

export const { setLayerUrl, setMapError } = mapSlice.actions


// THUNKS
export const getLayer = ({layerTypeId, layerId}: any): AppThunk => dispatch => {
    try {
        const url = api.map.selectLayerUrl({ layerTypeId, layerId })
        dispatch(setLayerUrl(url))
    } catch (err) {
        dispatch(setMapError(err.message))
    }
}

export default mapSlice.reducer
