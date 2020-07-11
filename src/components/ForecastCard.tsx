import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import Card from './Card'
import Button from './Button'
import Loader from './Loader'

import { getDailyForecast } from '../redux/slice/weather'
import { selectCoords, selectDailyForecast, selectThreeDayForecast } from '../redux/selectors'
import emoji from '../data/emoji'

const Container = styled(Card)`
    margin: 2rem 0;
`

const BottomButton = styled(Button)`
    margin-bottom: 2rem;
`

const Period = styled.div`
    margin-bottom: 1rem;
    padding-left: 1rem;
    padding-bottom: 1rem;
    text-align: left;
    border-bottom: 1px solid black;
    display: flex;
    cursor: pointer;
`

const ConditionIcon = styled.img`
    height: 4.5rem;
    width: 4.5rem;
    border-radius: 50%;
    margin-right: 1rem;
    transform: scale(0.8);
`

const DetailsContainer = styled.div`
    flex: 1;
`

const PeriodTitle = styled.span`
    font-weight: bold;
`

const Title = styled.h3``

const StatLine = styled.div`
    font-weight: bold;
`

const MoreButton = styled.span``

const StatContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 1rem;
`

const Description = styled.div`
    padding-right: 1rem;
`

const inferChanceOfPrecip = (forecast: string) => {
    const precipRegex = /\d{1,3}%/g
    const chance = forecast.match(precipRegex)
    if (chance) {
        return chance[0]
    }
}

const ForecastCard = () => {
    const initialDetails: any = {}
    const [isShowingFull, setFullForecast] = useState(false)
    const [detailsShowing, setDetails] = useState(initialDetails)
    const dispatch = useDispatch()
    const coords = useSelector(selectCoords)
    const threeDayForecast = useSelector(selectThreeDayForecast)

    const dailyForecast = useSelector(selectDailyForecast)

    const handleToggleDetails = (p: any) => () => {
        const showingDetails = detailsShowing[p.number]
        if (showingDetails) {
            const { [p.number]: value, ...rest } = detailsShowing;
            setDetails(rest)
        } else {
            setDetails({ ...detailsShowing, [p.number]: true })
        }
    }

    useEffect(() => {
        dispatch(getDailyForecast())
    }, [coords, dispatch])

    if (!dailyForecast) { return <Loader/> }

    const isPeriodDetailed = (p: any) => detailsShowing[p.number]

    const renderStatLine = (p: any) => {
        const { temperature, temperatureUnit: unit, windSpeed, windDirection } = p
        const tempString = `${emoji.temperature}: ${temperature} ${unit}`
        const windString = `${emoji.wind}: ${windSpeed} ${windDirection}`
        const chance = inferChanceOfPrecip(p.detailedForecast)
        const chanceString = chance ? ` | ${emoji.rainDrop}: ${chance}` : ''
        const statString = `${tempString} | ${windString}${chanceString}`
        const isShowing = isPeriodDetailed(p)
        return (
            <StatContainer>
                <StatLine>{statString} </StatLine>
                <MoreButton >{isShowing ? emoji.less : emoji.more}</MoreButton>
            </StatContainer>
        )
    }

    const renderDescription = (p: any) => {
        const isShowing = isPeriodDetailed(p)
        return (
            <Description>
                {isShowing ? p.detailedForecast : p.shortForecast}
            </Description>
        )
    }

    const periods = isShowingFull ? dailyForecast.periods : threeDayForecast
    return (
        <Container>
            <Title>Forecast</Title>
            {
                periods.map((p: any) => {
                    return (
                        <Period key={p.number} onClick={handleToggleDetails(p)}>
                            <ConditionIcon src={p.icon} alt="icon" />
                            <DetailsContainer>
                                <PeriodTitle>
                                    {p.name}
                                </PeriodTitle>
                                {renderStatLine(p)}
                                {renderDescription(p)}
                            </DetailsContainer>
                        </Period>
                    )
                })
            }
            <BottomButton onClick={() => setFullForecast(!isShowingFull)}>{isShowingFull ? 'Less' : 'More'}</BottomButton>
        </Container>
    )
}

export default ForecastCard
