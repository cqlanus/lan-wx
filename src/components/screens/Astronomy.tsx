import React from 'react'
import { withRouter, useParams, Route, Switch } from 'react-router'

import BottomNav from '../BottomNav'
import AllTimes from '../AllTimes'
import AllPositions from '../AllPositions'
import AstroSummary from '../AstroSummary'
import AstroCharts from '../AstroCharts'

import { ASTRO_OPTIONS } from '../AstronomyOptions'
import type { AST_OPTIONS } from '../AstronomyOptions'

const ASTRO_TYPES = {
    summary: { display: 'Summary' },
    times: { display: 'Times' },
    positions: { display: 'Positions' },
    charts: { display: 'Charts' },
}

const Astronomy = () => {
    const params: { astroType: keyof AST_OPTIONS } = useParams()
    const { astroType } = params
    const Options = ASTRO_OPTIONS[astroType]
    return (
        <div>
            <Switch>
                <Route path={'/astronomy/summary'}><AstroSummary /></Route>
                <Route exact path={'/astronomy/times'}><AllTimes /></Route>
                <Route exact path={'/astronomy/positions'}><AllPositions /></Route>
                <Route exact path={'/astronomy/charts'}><AstroCharts/></Route>
            </Switch>
            <BottomNav root="astronomy" options={ASTRO_TYPES} selected={(k: string) => k === astroType}>
                {Options && <Options />}
            </BottomNav>
        </div>
    )
}

export default withRouter(Astronomy)
