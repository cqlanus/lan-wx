import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment'

import { AppThunk } from '../store'
import api from '../../api'
import LAYERS from '../../data/layers'
import { selectCurrentLayerType } from '../selectors';

interface MapState {
    layerUrl: string,
    legendUrl?: string,
    layerTypeId: string,
    layerId: string,
    time: string,
    error?: string
}

const { radar } = LAYERS
const initArgs = { layerTypeId: radar.id, layerId: radar.layers[0].id, time: moment().toISOString() }
const initLayer = api.map.selectLayerUrl(initArgs)
const initLegend = 'https://nowcoast.noaa.gov/images/legends/radar.png'
const initialState: MapState = {
    layerUrl: initLayer,
    legendUrl: initLegend,
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
        },
        setLayerId: (state, action) => {
            state.layerId = action.payload
        },
        setLayerType: (state, action) => {
            if (action.payload !== state.layerTypeId) {
                const layerConfig = LAYERS[action.payload] || {}
                const [firstLayer] = layerConfig.layers || []
                state.layerId = firstLayer ? firstLayer.id : ''
            }
            state.layerTypeId = action.payload
        },
        setLegendUrl: (state, action) => {
            state.legendUrl = action.payload
        }
    }
})

export const { setLayerUrl, setMapError, setLegendUrl, setLayerType, setLayerId } = mapSlice.actions


// THUNKS
export const getLayer = ({ layerTypeId, layerId, timeOffset }: any): AppThunk => async dispatch => {
    try {
        const layerType = selectCurrentLayerType(layerTypeId)()
        let time
        if (layerType.forecast) {
            time = moment().startOf('minute').add(timeOffset, 'hours').toISOString()
        } else {
            const diff = timeOffset * 30
            time = moment().startOf('minute').add(diff, 'minutes').toISOString()

        }
        const url = api.map.selectLayerUrl({ layerTypeId, layerId, time })
        const legend = await api.map.buildLegendUrl({ layerTypeId, layerId })
        const { url: legendUrl } = legend || {}

        dispatch(setLayerUrl({ url, time, layerTypeId, layerId }))

        dispatch(setLegendUrl(legendUrl.replace('http', 'https')))
    } catch (err) {
        dispatch(setMapError(err.message))
    }
}

export default mapSlice.reducer
