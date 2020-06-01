import React from 'react'
import { withRouter, useParams, Route, Switch } from 'react-router'

import Norms from '../Norms'
import Almanac from '../Almanac'
import BottomNav from '../BottomNav'


const CLIMATE_TYPES = {
    norms: { display: 'Norms' },
    almanac: { display: 'Almanac' },
    astronomy: { display: 'Astronomy' }
}

const Climate = () => {
    const params: { climateType: any } = useParams()
    const { climateType } = params
    return (
        <div>
            <Switch>
                <Route exact path={'/climate/norms'} ><Norms /></Route>
                <Route exact path={'/climate/almanac'} ><Almanac /></Route>
                <Route exact path={'/climate/astronomy'} ><div /></Route>
            </Switch>
            <BottomNav root="climate" options={CLIMATE_TYPES} selected={(k: string) => k === climateType}></BottomNav>
        </div>
    )
}

export default withRouter(Climate)
