import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import toastr from 'toastr'

import api from '../../api'
import { selectPwsDevices } from '../selectors'
import { Device } from '../../types/pws'

interface PWSState {
    devices: Device[],
    weather: any[]
}

const initialState: PWSState = {
    devices: [],
    weather: []
}

export const pws = createSlice({
    name: 'pws',
    initialState,
    reducers: {
        setDevices: (state, action: PayloadAction<Device[]>) => {
            state.devices = action.payload
        },
        setPwsWeather: (state, action: PayloadAction<any[]>) => {
            state.weather = action.payload
        }
    }
})

export const { setDevices, setPwsWeather } = pws.actions

// THUNKS
const STORAGE_KEY = 'LAN_WX_DEVICES'
export const addDevice = (device: Device) => async (dispatch: any, getState: any) => {
    const { macAddress, } = device
    try {
        const currentDevices = selectPwsDevices(getState())
        const exists = currentDevices.find(({ macAddress: d }: Device) => d === macAddress)
        if (exists) {
            toastr.warning(`MAC Address ${exists} already exists`)
            return
        }
        const storage = window.localStorage
        const devicesStr = storage.getItem(STORAGE_KEY)
        if (devicesStr) {
            const devices = JSON.parse(devicesStr) || []
            const updatedDevices = [...devices, device]
            storage.setItem(STORAGE_KEY, JSON.stringify(updatedDevices))
            dispatch(setDevices(updatedDevices))
        } else {
            const devices = [device]
            storage.setItem(STORAGE_KEY, JSON.stringify(devices))
            dispatch(setDevices(devices))
        }
    } catch (err) {
        console.log({ err })
        toastr.error('Could not add device')
    }
}

export const getDevices = () => async (dispatch: any) => {
    try {
        const storage = window.localStorage
        const devicesStr = storage.getItem(STORAGE_KEY)
        if (devicesStr) {
            const devices = JSON.parse(devicesStr) || []
            dispatch(setDevices(devices))
        }
    } catch (err) {
        console.log({ err })
        toastr.error('Could not get devices')
    }
}

export const removeDevice = (macAddress: string) => async (dispatch: any) => {
    try {
        const storage = window.localStorage
        const devicesStr = storage.getItem(STORAGE_KEY)
        if (devicesStr) {
            const devices = JSON.parse(devicesStr) || []
            const updatedDevices = devices.filter(({ macAddress: d }: Device) => d === macAddress)
            storage.setItem(STORAGE_KEY, JSON.stringify(updatedDevices))
            dispatch(setDevices(updatedDevices))
        }
    } catch (err) {
        console.log({ err })
        toastr.error('Could not add device')
    }
}

export const getDeviceWeather = (macAddress: string, apiKey: string) => async (dispatch: any) => {
    try {
        const deviceWeather = await api.pws.getDeviceWeather(macAddress, apiKey)
        dispatch(setPwsWeather(deviceWeather))
    } catch (err) {
        console.log({ err })
        toastr.error(`Could not get device weather for device ${macAddress}`)
    } 
}

export default pws.reducer
