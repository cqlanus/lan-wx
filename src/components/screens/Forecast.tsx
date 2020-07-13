import React from 'react'
import { withRouter, useParams, Route, Switch } from 'react-router'

import BottomNav from '../BottomNav'
import ForecastDiscussion from '../ForecastDiscussion'
import DetailedForecast from '../DetailedForecast'
import Departures from '../Departures'

import { FORECAST_OPTIONS } from '../ForecastOptions'
import type { FO_OPTIONS } from '../ForecastOptions'

const FORECAST_TYPES = {
    details: { display: 'Details' },
    discussion: { display: 'Discussion' },
    departures: { display: 'Departures' }
}
const Forecast = () => {
    const params: { forecastType: keyof FO_OPTIONS } = useParams()
    const { forecastType } = params
    const Options = FORECAST_OPTIONS[forecastType]
    return (
        <div>
            <Switch>
                <Route exact path={'/forecast/discussion'}>
                    <ForecastDiscussion/>
                </Route>
                <Route exact path={'/forecast/details'}>
                    <DetailedForecast/>
                </Route>
                <Route exact path={'/forecast/departures'}>
                    <Departures/>
                </Route>
            </Switch>
            <BottomNav root="forecast" options={FORECAST_TYPES} selected={(k: string) => k === forecastType}>
                { Options && <Options /> }
            </BottomNav>
        </div>
    )
}

export default withRouter(Forecast)
