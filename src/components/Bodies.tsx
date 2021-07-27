import React, { useEffect } from 'react'
import { Switch, Route, Redirect, } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { format } from 'date-fns'
import { XAxis, YAxis, } from 'recharts'

import Charts from './Chartz'
import Container from './Container'
/* import Loader from './Loader' */
import AllTimes from './AllTimes'
import AllPositions from './AllPositions'

import { BASE_AXIS, } from './ChartContainer'
import { getPositionTimeseries } from '../redux/slice/astronomy'
import { selectCoords, selectPositionTimeseries } from '../redux/selectors'
import { localFormattedTime } from '../utils/time'

import type { CHART_CONFIG } from '../types/chart'

const formatTime = (d: any) => {
    return format(new Date(d), 'ha')
}

const altData = (key: string) => (d: any) => d[key].alt
const BASE_X_AXIS_POS = {
    ...BASE_AXIS,
    mirror: false,
    dataKey: 'date',
    tickFormatter: (d: any) => formatTime(d),
}

const BASE_Y_AXIS_POS = {
    ...BASE_AXIS,
}

const POSITION_CHARTS: CHART_CONFIG = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'].reduce((acc, body) => {
    return {
        ...acc,
        [body]: {
            title: `${body} altitude`,
            keys: [body],
            axes: [
                { ...BASE_X_AXIS_POS, type: XAxis },
                { ...BASE_Y_AXIS_POS, type: YAxis }]
        }
    }
}, {})

const createFormatTooltip = (valFormatter: any, nameFormatter: any) => (val: any, name: string) => {
    return [valFormatter(val), nameFormatter(name)]
}


const Bodies = () => {
    const dispatch = useDispatch()
    const coords = useSelector(selectCoords)
    const positionSeries = useSelector(selectPositionTimeseries)
    useEffect(() => {
        console.log({ here: 1 })
        dispatch(getPositionTimeseries())
    }, [dispatch, coords])

    /* if (!positionSeries) { return <Loader /> } */

    return (
        <Container>
            <Switch>
                <Route exact path="/astronomy/bodies"><Redirect to="/astronomy/bodies/times" /></Route>
                <Route path="/astronomy/bodies/positions"><AllPositions /></Route>
                <Route path="/astronomy/bodies/times"><AllTimes /></Route>
            </Switch>
            <Charts
                charts={POSITION_CHARTS}
                data={positionSeries}
                findFn={altData}
                tooltipTitleFn={localFormattedTime}
                tooltipLabelFn={createFormatTooltip((v: number) => v.toFixed(2), () => 'alt')}
            />
        </Container>
    )
}

/* export default withRouter(Bodies) */
export default Bodies
