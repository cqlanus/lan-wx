import React from 'react'

import MapCard from '../MapCard'
import Current from '../Current'
import ForecastCard from '../ForecastCard'

const Home = () => {
    return (
        <>
            <Current />
            <MapCard />
            <ForecastCard />
        </>
    )
}

export default Home
