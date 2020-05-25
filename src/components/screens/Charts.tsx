import React, { useEffect, useState, } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import Button from '../Button'
import { getChart } from '../../redux/slice/chart'
import { selectCurrentChart } from '../../redux/selectors'

import { CHART_OPTIONS } from '../ChartOptions'


type CHART_TYPE = { display: string }
type CH_TYPES = {
    skewT: CHART_TYPE,
    upperAir: CHART_TYPE,
    surface: CHART_TYPE,
}
const CHART_TYPES: CH_TYPES = {
    skewT: {
        display: 'SkewT'
    },
    upperAir: {
        display: 'Upper Air',
    },
    surface: {
        display: 'Surface',
    }
}

const Container = styled.div`
    height: 90vh;
`

const BottomContainer = styled.div`
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
`

const ButtonGroup = styled.div`
    display: flex;
`

const ChartButton = styled(Button)`
    flex: 1;
`

const ImgContainer = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ChartImage = styled.img`
    width: 100%;
`
const Charts = (p: any) => {
    const initialChart: keyof CH_TYPES = 'upperAir'
    const [chartType, setChartType] = useState<keyof CH_TYPES>(initialChart)

    const initialChartOptions = { isobar: '500', timeOfDay: 'morning' }
    const [ upperAirOptions, setUpperAirOptions ] = useState(initialChartOptions)
    const [ skewTOptions, setSkewTOptions ] = useState(initialChartOptions)

    const OPTIONS_STATE: any = {
        upperAir: upperAirOptions,
        skewT: skewTOptions,
    }
    const OPTIONS_SELECT: any = {
        upperAir: setUpperAirOptions,
        skewT: setSkewTOptions,
    }

    const options = OPTIONS_STATE[chartType]
    const handleSelectChartType = (type: keyof CH_TYPES) => () => setChartType(type)
    const handleSelectOptions = (key: string, value: string) => () => {
        OPTIONS_SELECT[chartType]({
            ...options,
            [key]: value
        })
    }

    const dispatch = useDispatch()
    const currentChart = useSelector(selectCurrentChart(chartType))

    useEffect(() => {
        dispatch(getChart(chartType, options))
    }, [OPTIONS_STATE, chartType, dispatch, options])

    const Options = CHART_OPTIONS[chartType]

    return (
        <Container>
            <ImgContainer>
                {currentChart && <ChartImage src={currentChart} alt="" />}
            </ImgContainer>
            <BottomContainer>
                <Options handleSelect={handleSelectOptions} selectedOptions={options} />
                <ButtonGroup>
                    {
                        Object.entries(CHART_TYPES).map((entry) => {
                            const [k, chType]: any = entry
                            return (
                                <ChartButton onClick={handleSelectChartType(k)} key={k}>{chType.display}</ChartButton>
                            )
                        })
                    }
                </ButtonGroup>
            </BottomContainer>
        </Container>
    )
}

export default Charts
