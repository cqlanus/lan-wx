import React, { ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Select from './Select'
import OptionContainer from './OptionsContainer'

import { setCurrentDevice } from '../redux/slice/pws'
import { selectPwsDevices, selectCurrentDevice } from '../redux/selectors'

const DeviceOptions = () => {
    const devices: any[] = useSelector(selectPwsDevices)
    const dispatch = useDispatch()
    const currentDevice = useSelector(selectCurrentDevice)

    const handleSelect = (e: any) => {
        const { value } = e.target
        dispatch(setCurrentDevice(value))
    }

    return (
        <OptionContainer>
            <Select onChange={handleSelect} value={currentDevice}>
                {
                    devices.map(device => {
                        return <option key={device.id} value={device.macAddress}>{device.macAddress}</option>
                    })
                }
            </Select>
        </OptionContainer>
    )
}

export type PwsOptions = {
    current: (p: any) => ReactElement,
    recent: null
}

export const PWS_OPTIONS: PwsOptions = {
    current: DeviceOptions,
    recent: null
}
