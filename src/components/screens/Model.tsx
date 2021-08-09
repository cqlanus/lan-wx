import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, } from 'react-router'

import BottomNav from '../BottomNav'
import Button from '../Button'
import Select from '../Select'
import Loader from '../Loader'

import ModelGuidance from '../../data/modelGuidance'
import { getModelGuidance } from '../../redux/slice/model'
import { selectModelImage } from '../../redux/selectors'

import getTheme from '../../themes'

const Container = styled.div`
    min-height: 90vh;
    margin-bottom: 200px;
`

const OptionsContainer = styled.div`
    background: ${() => getTheme().bg};
`

const ButtonGroup = styled.div`
    display: flex;
    align-items: center;
    padding: 0.5rem 0;
`

const BottomButton = styled(Button)`
    color: ${() => getTheme().fg};
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
    const INIT_HOUR = 1
    const [forecastHour, setHour] = useState(INIT_HOUR)
    const initialProd = Object.keys(modelObj.products)[0]
    const [product, setProduct] = useState(initialProd)
    const [productObj, setProductObj] = useState( modelObj.products[initialProd] )
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
    }, [product, model, forecastHour, dispatch])

    if (!modelObj) { return null }

    const handleSelectProduct = (e: any) => {
        const value = e.target.value
        const pObj = modelObj.products[value]
        setHour(pObj.start)
        setProduct(value)
        setProductObj(pObj)
    }

    const inc = () => {
        const { max, interval } = productObj
        if (forecastHour < max) {
            setHour(forecastHour + interval)
        } else {
            setHour(max)
        }
    }

    const dec = () => {
        const { start, interval, max } = productObj
        if (forecastHour > start) {
            setHour(forecastHour - interval)
        } else {
            setHour(max)
        }
    }
    return (
        <OptionsContainer>
            <Select value={product} onChange={handleSelectProduct} onSelect={handleSelectProduct}>
                {Object.entries(modelObj.products).map(([k, v]) => {
                    return (
                        <option key={k} value={k}>{v.name}</option>
                    )
                })}
            </Select>
            <ButtonGroup>
                <BottomButton onClick={dec}>{'<'}</BottomButton>
                <ForecastHour>
                    {`+${forecastHour}hrs`}
                </ForecastHour>
                <BottomButton onClick={inc}>{'>'}</BottomButton>
            </ButtonGroup>
            <Reset onClick={() => setHour(productObj.start || 1)}>Reset Hour</Reset>
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
                {currentChart ? <ChartImage src={currentChart} alt="" /> : <Loader/>}
            </ImgContainer>

            <BottomNav root="model" options={MODEL_TYPES} selected={(k: string) => k === modelType}>
                <Options model={modelType} />
            </BottomNav>
        </Container>
    )
}

export default Model
