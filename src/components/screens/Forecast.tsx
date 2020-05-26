import React from 'react'
import { withRouter, useParams, Route, Switch } from 'react-router'

import BottomNav from '../BottomNav'
import ForecastDiscussion from '../ForecastDiscussion'
import DetailedForecast from '../DetailedForecast'

const FORECAST_OPTIONS = {
    details: { display: 'Details' },
    discussion: { display: 'Discussion' },
}

const Forecast = ({ match }: any) => {
    const { forecastType } = useParams()
    return (
        <div>
            <Switch>
                <Route path={ `${match.path}discussion` }>
                    <ForecastDiscussion/>
                </Route>
                <Route path={ `${match.path}details` }>
                    <DetailedForecast/>
                </Route>
            </Switch>
            <BottomNav root="forecast" options={FORECAST_OPTIONS} selected={(k: string) => k === forecastType}/>
        </div>
    )
}

export default withRouter(Forecast)
