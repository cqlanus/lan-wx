import React, { useEffect } from 'react'
import { useParams, Route, Switch } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'

import BottomNav from '../BottomNav'
import CurrentDeviceWeather from '../CurrentDeviceWeather'
import RecentDeviceWeather from '../RecentDeviceWeather'

import { getDeviceWeather, getDevices } from '../../redux/slice/pws'
import { selectPwsDevices } from '../../redux/selectors'

const PWS_TYPES = {
    current: { display: 'Current' },
    recent: { display: 'Recent' }
}
const PWS = () => {
    const params: { pwsType: string } = useParams()
    const { pwsType } = params

    const dispatch = useDispatch()
    const devices = useSelector(selectPwsDevices)

    const handleGetWeather = () => {
        if (devices.length > 0) {
            const [ device ] = devices
            const { macAddress, apiKey } = device
            dispatch(getDeviceWeather(macAddress, apiKey))
        }
    }
    useEffect(() => {
        dispatch(getDevices())
    }, [])

    useEffect(() => {
        handleGetWeather()
    }, [ dispatch, devices ])

    return (
        <div>
            <Switch>
                <Route exact path="/pws/current"><CurrentDeviceWeather /></Route>
                <Route exact path="/pws/recent"><RecentDeviceWeather /></Route>
            </Switch>
            <BottomNav root="pws" options={PWS_TYPES} selected={(k: string) => k === pwsType}></BottomNav>
        </div>
    )
}

export default PWS
