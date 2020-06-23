import React, { useEffect } from 'react'
import { useParams, Route, Switch } from 'react-router'
import { useDispatch, } from 'react-redux'

import BottomNav from '../BottomNav'
import CurrentDeviceWeather from '../CurrentDeviceWeather'
import RecentDeviceWeather from '../RecentDeviceWeather'

import { getDevices, } from '../../redux/slice/pws'

const PWS_TYPES = {
    current: { display: 'Current' },
    recent: { display: 'Recent' }
}
const PWS = () => {
    const params: { pwsType: string } = useParams()
    const { pwsType } = params

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDevices())
    }, [ dispatch ])

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
