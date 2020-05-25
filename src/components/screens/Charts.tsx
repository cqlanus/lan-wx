import React, { useEffect, useState, ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import Button from '../Button'
import { getChart } from '../../redux/slice/chart'
import { selectCurrentChart } from '../../redux/selectors'

const Container = styled.div`
    height: 90vh;
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

const OptionContainer = styled.div`
    border: 1px dashed black;
    border-bottom: none;
`

const OptionTitle = styled.div`
    text-decoration: underline;
    margin-bottom: 0.5rem;
`

const OptionLabel = styled.label`
    margin-left: 0.5rem;
`

const UpperAirContainer = styled(OptionContainer)`
    display: flex;
    justify-content: space-around;
    padding: 1rem;
`

const BottomContainer = styled.div`
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
`

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

const SurfaceOptions = () => {
    return (
        <div />
    )
}

const SkewTOptions = () => {
    return (
        <div />
    )
}

const UPPER_AIR_OPTIONS = {
    isobar: ['925', '850', '700', '500', '300', '200'],
    timeOfDay: ['evening', 'morning']
}
const UpperAirOptions = ({ handleSelect, selectedOptions }: any) => {
    return (
        <UpperAirContainer>
            <div>
                <OptionTitle>Isobar</OptionTitle>
                {
                    UPPER_AIR_OPTIONS.isobar.map(i => {
                        return <div>
                            <input onChange={handleSelect('isobar', i)} checked={selectedOptions.isobar === i} type="radio" name={i} value={i} />
                            <OptionLabel>{i}mb</OptionLabel>
                        </div>
                    })
                }
            </div>
            <div>
                <OptionTitle>Time</OptionTitle>
                {
                    UPPER_AIR_OPTIONS.timeOfDay.map(t => {
                        return <div>
                            <input onChange={handleSelect('timeOfDay', t)} checked={selectedOptions.timeOfDay === t} type="radio" name={t} value={t} />
                            <OptionLabel>{t}</OptionLabel>
                        </div>
                    })
                }
            </div>
        </UpperAirContainer>
    )
}

type OptionsProps = {
    handleSelect: (key: string, value: string) => void,
    selectedOptions: any,
}
type CH_OPTIONS = {
    skewT: ( p: OptionsProps ) => ReactElement
    upperAir: (p: OptionsProps) => ReactElement
    surface: (p: OptionsProps) => ReactElement
}

const CHART_OPTIONS: CH_OPTIONS = {
    skewT: SurfaceOptions,
    upperAir: UpperAirOptions,
    surface: SurfaceOptions,
}

const Charts = (p: any) => {
    const initialChart: keyof CH_TYPES = 'upperAir'
    const [chartType, setChartType] = useState<keyof CH_TYPES>(initialChart)

    const initialChartOptions = { isobar: '500', timeOfDay: 'morning' }
    const [ upperAirOptions, setUpperAirOptions ] = useState(initialChartOptions)

    const handleSelectChartType = (type: keyof CH_TYPES) => () => setChartType(type)
    const handleSelectOptions = (key: string, value: string) => () => {
        setUpperAirOptions({
            ...upperAirOptions,
            [key]: value
        })
    }

    const dispatch = useDispatch()
    const currentChart = useSelector(selectCurrentChart(chartType))

    useEffect(() => {
        const args = chartType === 'upperAir' ? upperAirOptions : []
        dispatch(getChart(chartType, args))
    })

    const Options = CHART_OPTIONS[chartType]

    return (
        <Container>
            <ImgContainer>
                {currentChart && <ChartImage src={currentChart} alt="" />}
            </ImgContainer>
            <BottomContainer>
                <Options handleSelect={handleSelectOptions} selectedOptions={upperAirOptions} />
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
