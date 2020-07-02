import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, } from 'react-router'

import BottomNav from '../BottomNav'
import Button from '../Button'
import Select from '../Select'

import ModelGuidance from '../../data/modelGuidance'
import { getModelGuidance } from '../../redux/slice/model'
import { selectModelImage } from '../../redux/selectors'

const Container = styled.div`
    min-height: 90vh;
    margin-bottom: 200px;
`

const OptionsContainer = styled.div`
    background: white;
`

const ButtonGroup = styled.div`
    display: flex;
    align-items: center;
    padding: 0.5rem 0;
`

const BottomButton = styled(Button)`
    color: black;
    flex: 1;

    &:hover: {
         font-weight: bold;
    }
`

const Reset = styled(Button)`
    padding: 0.3rem;
    margin-bottom: 0.5rem;
    font-size: 0.7rem;
`

const ForecastHour = styled.div`
    flex: 1;
`

const ImgContainer = styled.div`
    height: 100%;
    overflow-x: scroll;
    display: flex;
`

const ChartImage = styled.img`
    max-width: 1024px;
`

const MODEL_TYPES = {
    gfs: { display: 'GFS' },
    nam: { display: 'NAM' },
    hrrr: { display: 'HRRR' }
}

type OptionsProps = {
    model: 'gfs' | 'nam' | 'hrrr'
}
const Options = ({ model }: OptionsProps) => {
    const modelObj = ModelGuidance[model]
    const MAX_HOURS = 36
    const INIT_HOUR = 1
    const [forecastHour, setHour] = useState(INIT_HOUR)
    const initialProd = modelObj ? Object.keys(modelObj.products)[0] : ''
    const [product, setProduct] = useState(initialProd)
    const dispatch = useDispatch()
    const formatForecastHour = (hour: number) => {
        let forecastHour = `${hour}`
        let length = forecastHour.length
        while (length < 3) {
            forecastHour = `0${forecastHour}`
            length = forecastHour.length
        }
        if (model === 'hrrr') {
            return `${forecastHour}00`
        }
        return forecastHour
    }
    useEffect(() => {
        if (product && model && forecastHour) {
            const hour = formatForecastHour(forecastHour)
            dispatch(getModelGuidance(model, product, hour))
        }
    }, [product, model, forecastHour])
    if (!modelObj) { return null }
    const handleSelectProduct = (e: any) => {
        const value: string = e.target.value
        setHour(1)
        setProduct(value)
    }

    const inc = () => {
        if (forecastHour < MAX_HOURS) {
            setHour(forecastHour + 1)
        }
    }

    const dec = () => {
        if (forecastHour > INIT_HOUR) {
            setHour(forecastHour - 1)
        }
    }
    return (
        <OptionsContainer>
            <Select value={product} onChange={handleSelectProduct} onSelect={handleSelectProduct}>
                {Object.entries(modelObj.products).map(([k, v]) => {
                    return (
                        <option key={k} value={k}>{v}</option>
                    )
                })}
            </Select>
            <ButtonGroup>
                <BottomButton onClick={dec}>{'<'}</BottomButton>
                <ForecastHour>
                    {`Hour ${forecastHour}`}
                </ForecastHour>
                <BottomButton onClick={inc}>{'>'}</BottomButton>
            </ButtonGroup>
            <Reset onClick={() => setHour(1)}>Reset Hour</Reset>
        </OptionsContainer>
    )
}

const Model = () => {
    const params: any = useParams()
    const { modelType } = params
    const currentChart = useSelector(selectModelImage)
    return (
        <Container>

            <ImgContainer>
                {currentChart && <ChartImage src={currentChart} alt="" />}
            </ImgContainer>

            <BottomNav root="model" options={MODEL_TYPES} selected={(k: string) => k === modelType}>
                <Options model={modelType} />
            </BottomNav>
        </Container>
    )
}

export default Model
