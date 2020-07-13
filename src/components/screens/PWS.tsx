import React from 'react'
import { useParams, Route, Switch } from 'react-router'

import BottomNav from '../BottomNav'
import CurrentDeviceWeather from '../CurrentDeviceWeather'
import RecentDeviceWeather from '../RecentDeviceWeather'
import { PWS_OPTIONS } from '../PWSOptions'
import type { PwsOptions } from '../PWSOptions'

const PWS_TYPES = {
    current: { display: 'Current' },
    recent: { display: 'Recent' }
}
const PWS = () => {
    const params: { pwsType: keyof PwsOptions } = useParams()
    const { pwsType } = params
    const Options = PWS_OPTIONS[pwsType]

    return (
        <div>
            <Switch>
                <Route exact path="/pws/current"><CurrentDeviceWeather /></Route>
                <Route exact path="/pws/recent"><RecentDeviceWeather /></Route>
            </Switch>
            <BottomNav root="pws" options={PWS_TYPES} selected={(k: string) => k === pwsType}>
                {Options && <Options />}
            </BottomNav>
        </div>
    )
}

export default PWS
