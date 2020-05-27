import React from 'react'
import { withRouter, useParams, Route, Switch } from 'react-router'

import BottomNav from '../BottomNav'
import ForecastDiscussion from '../ForecastDiscussion'
import DetailedForecast from '../DetailedForecast'

const FORECAST_OPTIONS = {
    details: { display: 'Details' },
    discussion: { display: 'Discussion' },
}

const Forecast = () => {
    const { forecastType } = useParams()
    return (
        <div>
            <Switch>
                <Route exact path={'/forecast/discussion'}>
                    <ForecastDiscussion/>
                </Route>
                <Route exact path={'/forecast/details'}>
                    <DetailedForecast/>
                </Route>
            </Switch>
            <BottomNav root="forecast" options={FORECAST_OPTIONS} selected={(k: string) => k === forecastType}/>
        </div>
    )
}

export default withRouter(Forecast)
