import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment'

import { AppThunk } from '../store'
import api from '../../api'
import LAYERS from '../../data/layers'

interface MapState {
    layerUrl: string,
    layerTypeId: string,
    layerId: string,
    time: string,
    error?: string
}

const { radar } = LAYERS
const initArgs = { layerTypeId: radar.id, layerId: radar.layers[0].id, time: moment().toISOString() }
const initLayer = api.map.selectLayerUrl(initArgs)
const initialState: MapState = {
    layerUrl: initLayer,
    ...initArgs
}

export const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setLayerUrl: (state, action) => {
            const { url, time, layerTypeId, layerId } = action.payload
            state.layerUrl = url
            state.time = time
            state.layerTypeId = layerTypeId
            state.layerId = layerId
            state.error = undefined
        },
        setMapError: (state, action) => {
            state.error = action.payload
        }
    }
})

export const { setLayerUrl, setMapError } = mapSlice.actions


// THUNKS
export const getLayer = ({layerTypeId, layerId, timeOffset}: any): AppThunk => dispatch => {
    try {
        // console.log({ layerTypeId, layerId })
        const diff = timeOffset * 30
        const time = moment().startOf('minute').subtract(diff, 'minutes').toISOString()
        const url = api.map.selectLayerUrl({ layerTypeId, layerId, time })
        dispatch(setLayerUrl({ url, time, layerTypeId, layerId }))
    } catch (err) {
        dispatch(setMapError(err.message))
    }
}

export default mapSlice.reducer
