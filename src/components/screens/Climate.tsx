import React from 'react'
import { withRouter, useParams, Route, Switch } from 'react-router'

import Norms from '../Norms'
import Almanac from '../Almanac'
import Astronomy from '../Astronomy'
import BottomNav from '../BottomNav'

import { CLIMATE_OPTIONS } from '../ClimateOptions'
import type { CLIM_OPTIONS } from '../ClimateOptions'

const CLIMATE_TYPES = {
    norms: { display: 'Norms' },
    almanac: { display: 'Almanac' },
    astronomy: { display: 'Astronomy' }
}

const Climate = () => {
    const params: { climateType: keyof CLIM_OPTIONS } = useParams()
    const { climateType } = params
    const Options = CLIMATE_OPTIONS[climateType]
    return (
        <div>
            <Switch>
                <Route exact path={'/climate/norms'} ><Norms /></Route>
                <Route exact path={'/climate/almanac'} ><Almanac /></Route>
                <Route exact path={'/climate/astronomy'} ><Astronomy /></Route>
            </Switch>
            <BottomNav root="climate" options={CLIMATE_TYPES} selected={(k: string) => k === climateType}>
                {Options && <Options />}
            </BottomNav>
        </div>
    )
}

export default withRouter(Climate)
