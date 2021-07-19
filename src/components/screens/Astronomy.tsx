import React from 'react'
import { withRouter, useParams, Route, Switch } from 'react-router'

import BottomNav from '../BottomNav'
import AllTimes from '../AllTimes'
import AllPositions from '../AllPositions'
import AstroSummary from '../AstroSummary'

/* import { ASTRO_OPTIONS } from '../AstronomyOptions' */
import type { AST_OPTIONS } from '../AstronomyOptions'

const ASTRO_TYPES = {
    summary: { display: 'Summary' },
    times: { display: 'Times' },
    positions: { display: 'Positions' },
}

const Astronomy = () => {
    const params: { astroType: keyof AST_OPTIONS } = useParams()
    const { astroType } = params
    return (
        <div>
            <Switch>
                <Route path={'/astronomy/summary'}><AstroSummary /></Route>
                <Route exact path={'/astronomy/times'}><AllTimes /></Route>
                <Route exact path={'/astronomy/positions'}><AllPositions /></Route>
            </Switch>
            <BottomNav root="astronomy" options={ASTRO_TYPES} selected={(k: string) => k === astroType}>
            </BottomNav>
        </div>
    )
}

export default withRouter(Astronomy)
