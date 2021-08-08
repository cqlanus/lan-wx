import React from 'react'
import { withRouter, useParams, Route, Switch } from 'react-router'

import BottomNav from '../BottomNav'
import Bodies from '../Bodies'
import AstroSummary from '../AstroSummary'
import AstroConditions from '../AstroConditions'

import { ASTRO_OPTIONS } from '../AstronomyOptions'
import type { AST_OPTIONS } from '../AstronomyOptions'

const ASTRO_TYPES = {
    summary: { display: 'Summary' },
    bodies: { display: 'Bodies' },
    conditions: { display: 'Conditions' },
}

const Astronomy = () => {
    const params: { astroType: keyof AST_OPTIONS } = useParams()
    const { astroType } = params
    const Options = ASTRO_OPTIONS[astroType]
    return (
        <div>
            <Switch>
                <Route path={'/astronomy/summary'}><AstroSummary /></Route>
                <Route path={'/astronomy/bodies'}><Bodies /></Route>
                <Route path={'/astronomy/conditions'}><AstroConditions /></Route>
            </Switch>
            <BottomNav root="astronomy" options={ASTRO_TYPES} selected={(k: string) => k === astroType}>
                {Options && <Options />}
            </BottomNav>
        </div>
    )
}

export default withRouter(Astronomy)
