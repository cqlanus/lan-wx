import React from 'react'
import { withRouter, useParams, Route, Switch } from 'react-router'

import BottomNav from '../BottomNav'
import AllTimes from '../AllTimes'
import AllPositions from '../AllPositions'

/* import { ASTRO_OPTIONS } from '../AstronomyOptions' */
import type { AST_OPTIONS } from '../AstronomyOptions'

const ASTRO_TYPES = {
    times: { display: 'Times' },
    positions: { display: 'Positions' },
}

const Astronomy = () => {
    const params: { astroType: keyof AST_OPTIONS } = useParams()
    const { astroType } = params
    return (
        <>
            <Switch>
                <Route exact path={'/astronomy/times'}><AllTimes /></Route>
                <Route exact path={'/astronomy/positions'}><AllPositions /></Route>
            </Switch>
            <BottomNav root="astronomy" options={ASTRO_TYPES} selected={(k: string) => k === astroType}>
            </BottomNav>
        </>
    )
}

export default withRouter(Astronomy)
