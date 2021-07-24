import React from 'react'
import { withRouter, Redirect, Route, Switch } from 'react-router'

import SunSummary from './SunSummary'
import MoonSummary from './MoonSummary'
import Container from './Container'

const AstroSummary = () => {
    return (
        <Container>
            <Switch>
                <Route exact path="/astronomy/summary"><Redirect to="/astronomy/summary/moon" /></Route>
                <Route path="/astronomy/summary/sun"><SunSummary/></Route>
                <Route path="/astronomy/summary/moon"><MoonSummary/></Route>
            </Switch>
        </Container>
    )
}

export default withRouter(AstroSummary)
