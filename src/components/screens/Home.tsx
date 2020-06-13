import React from 'react'
import { useParams, Route, Switch } from 'react-router'

import BottomNav from '../BottomNav'
import MapCard from '../MapCard'
import Current from '../Current'
import ForecastCard from '../ForecastCard'
import RecentWeather from '../RecentWeather'

const CURRENT_TYPES = {
    current: { display: 'Current' },
    recent: { display: 'Recent' }
}

const Home = () => {
    const params: any = useParams()
    const { type } = params
    return (
        <>
            <Switch>
                <Route exact path={'/home/current'}>
                    <Current />
                    <MapCard />
                    <ForecastCard />
                </Route>
                <Route exact path={'/home/recent'}>
                    <RecentWeather />
                </Route>
            </Switch>
            <BottomNav root="home" options={CURRENT_TYPES} selected={(k: string) => k === type}></BottomNav>
        </>
    )
}

export default Home
