import React from 'react'
import { withRouter, Redirect, Route, Switch } from 'react-router'

import SunSummary from './SunSummary'
import MoonSummary from './MoonSummary'

const AstroSummary = () => {
    return (
        <>
            <Switch>
                <Route exact path="/astronomy/summary"><Redirect to="/astronomy/summary/sun" /></Route>
                <Route path="/astronomy/summary/sun"><SunSummary/></Route>
                <Route path="/astronomy/summary/moon"><MoonSummary/></Route>
            </Switch>
        </>
    )
}

export default withRouter(AstroSummary)
