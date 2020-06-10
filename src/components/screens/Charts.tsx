import React, { useEffect, useState, } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter, useParams } from 'react-router-dom'
import styled from 'styled-components'

import BottomNav from '../BottomNav'
import { getChart } from '../../redux/slice/chart'
import { selectCurrentChart, selectCoords } from '../../redux/selectors'

import { CHART_OPTIONS } from '../ChartOptions'


type CHART_TYPE = { display: string }
type CH_TYPES = {
    skewt: CHART_TYPE,
    upperair: CHART_TYPE,
    surface: CHART_TYPE,
}
const CHART_TYPES: CH_TYPES = {
    skewt: {
        display: 'SkewT'
    },
    upperair: {
        display: 'Upper Air',
    },
    surface: {
        display: 'Surface',
    }
}

const Container = styled.div`
    min-height: 90vh;
    margin-bottom: 200px;
`

const ImgContainer = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ChartImage = styled.img`
    flex-basis: 1024px;
`
const Charts = (p: any) => {
    const params: { chartType: keyof CH_TYPES } = useParams()
    const { chartType } = params

    const initialChartOptions = { isobar: '500', timeOfDay: 'morning' }
    const initalSurfaceOptions = { timeOfDay: '03', surfaceObservations: true }
    const [upperAirOptions, setUpperAirOptions] = useState(initialChartOptions)
    const [skewTOptions, setSkewTOptions] = useState(initialChartOptions)
    const [surfaceOptions, setSurfaceOptions] = useState(initalSurfaceOptions)

    const coords = useSelector(selectCoords)

    const OPTIONS_STATE: any = {
        upperair: upperAirOptions,
        skewt: skewTOptions,
        surface: surfaceOptions,
    }
    const OPTIONS_SELECT: any = {
        upperair: setUpperAirOptions,
        skewt: setSkewTOptions,
        surface: setSurfaceOptions
    }

    const options = OPTIONS_STATE[chartType]
    const handleSelectOptions = (key: string, value: string | boolean) => () => {
        OPTIONS_SELECT[chartType]({
            ...options,
            [key]: value
        })
    }

    const dispatch = useDispatch()
    const currentChart = useSelector(selectCurrentChart(chartType))

    useEffect(() => {
        dispatch(getChart(chartType, options))
    }, [OPTIONS_STATE, chartType, dispatch, options, coords])

    const Options = CHART_OPTIONS[chartType]
    return (
        <Container>
            <ImgContainer>
                {currentChart && <ChartImage src={currentChart} alt="" />}
            </ImgContainer>

            <BottomNav root="charts" options={CHART_TYPES} selected={ (k: string) => k === chartType }>
                <Options handleSelect={handleSelectOptions} selectedOptions={options} />
            </BottomNav>
        </Container>
    )
}

export default withRouter(Charts)
