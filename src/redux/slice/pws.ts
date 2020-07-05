import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import toastr from 'toastr'

import api from '../../api'
import { selectPwsDevices, selectUser } from '../selectors'
import { Device, DeviceInfo, DeviceArgs } from '../../types/pws'
import { getAuthUser } from './auth';

interface PWSState {
    devices: Device[],
    current: string | undefined,
    weather: any[],
    deviceInfo: DeviceInfo | undefined,
}

const initialState: PWSState = {
    devices: [],
    current: undefined,
    weather: [],
    deviceInfo: undefined
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
        },
        setDeviceInfo: (state, action: PayloadAction<DeviceInfo>) => {
            state.deviceInfo = action.payload
        },
        setCurrentDevice: (state, action: PayloadAction<string>) => {
            state.current = action.payload
        }
    }
})

export const { setDevices, setPwsWeather, setDeviceInfo, setCurrentDevice } = pws.actions

// THUNKS
const STORAGE_KEY = 'LAN_WX_DEVICES'
export const addDevice = (device: DeviceArgs) => async (dispatch: any, getState: any) => {
    const { macAddress, apiKey } = device
    try {
        const currentDevices = selectPwsDevices(getState())
        const user = selectUser(getState())
        if (!user) { return }
        const exists = currentDevices.find(({ macAddress: d }: Device) => d === macAddress)
        if (exists) {
            toastr.warning(`MAC Address ${exists} already exists`)
            return
        }
        const created = await api.pws.addDevice(macAddress, apiKey, user.id)
        if (created) {
            dispatch(getAuthUser())
        }
    } catch (err) {
        console.log({ err })
        toastr.error('Could not add device')
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

export const getDeviceInfo = (macAddress: string, apiKey: string) => async (dispatch: any) => {
    try {
        const deviceInfo = await api.pws.getDeviceInfo(macAddress, apiKey)
        dispatch(setDeviceInfo(deviceInfo))
    } catch (err) {
        console.log({ err })
        toastr.error(`Could not get device info for device ${macAddress}`)
    }
}


export default pws.reducer
