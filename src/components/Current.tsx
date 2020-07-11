import React, { useEffect } from 'react'
import moment from 'moment'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import Card from './Card'
import Loader from './Loader'
import { getCurrentWeather } from '../redux/slice/weather'
import { favoriteStation } from '../redux/slice/user'
import { selectCoords, selectCurrentWeather, selectIsStationFavorite, selectAuthUser } from '../redux/selectors'
import emoji from '../data/emoji'
import { getDisplayUnit } from '../utils/units'

const Container = styled(Card)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 40vh;
`

const ConditionIcon = styled.img`
    border-radius: 50%;
    margin-right: 1rem;
`

const Flex = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`
const CurrentContainer = styled.div`
    flex: 1;
    text-align: left;
`

const Title = styled.h3`
    margin-bottom: 0.5rem;
`

const Spacer = styled.div`
    margin-bottom: 1rem;
`

const Info = styled.span`
    font-size: 0.7rem;
`

const Reload = styled.span`
    cursor: pointer;
    margin-left: 0.5rem;
`

const FavoriteBtn = styled.span`
cursor: pointer;
    border: 1px dashed black;
    padding: 0 0.5rem;
`

const DISPLAY_LABEL_MAP: any = {
    textDescription: 'Now',
    temperature: emoji.temperature,
    heatIndex: 'Feels like',
    windChill: 'Feels like',
    dewpoint: 'Dewpoint',
    relativeHumidity: 'Humidity',
    visibility: 'Visibility',
    barometricPressure: 'Pressure',
    windSpeed: 'Wind speed',
    windDirection: 'Wind direction',
}

const getDisplayLabel = (key: string) => {
    const displayLabel = DISPLAY_LABEL_MAP[key]
    return displayLabel || key
}

const CURRENT_WX_STRUCTURE = {
    main: { textDescription: { unit: false }, temperature: { unit: true }, heatIndex: { unit: true }, windChill: { unit: true } },
    secondary: {
        wind: [{ display: emoji.wind, key: 'windSpeed', unit: true }, { display: '', key: 'windDirection', unit: true }],
        air: [{ display: 'DP', key: 'dewpoint', unit: true }, { display: 'RH', key: 'relativeHumidity', unit: true }],
        pressure: [{ display: 'Pressure', key: 'barometricPressure', unit: true }],
        /* visibility: [{ display: 'Visibility', key: 'visibility', unit: true }] */
    },
}

const Current = () => {
    const dispatch = useDispatch()
    const coords = useSelector(selectCoords)
    const currentWeather: any = useSelector(selectCurrentWeather)
    const isFavorite = useSelector(selectIsStationFavorite)
    const authUser = useSelector(selectAuthUser)

    const handleGetWeather = () => {
        dispatch(getCurrentWeather())
    }

    const handleSave = (icao: string) => () => {
        dispatch(favoriteStation(icao))
    }

    useEffect(() => {
        dispatch(getCurrentWeather())
    }, [dispatch, coords])

    if (!currentWeather) { return <Loader/> }

    const { main, secondary } = CURRENT_WX_STRUCTURE
    const { timestamp, icon, station } = currentWeather
    const renderMain = () => {
        return (<Flex>
            <ConditionIcon src={icon} alt="icon" />
            <CurrentContainer>
                {Object.entries(main).map(([k, { unit }]) => {
                    const data = currentWeather[k]
                    const display = unit ? `${getDisplayUnit(data)}` : data
                    if (data.value === null) { return null }
                    const label = getDisplayLabel(k)
                    return <div key={k}>{label}: {display} </div>
                })}

            </CurrentContainer>
        </Flex>)
    }

    const renderSecondary = () => Object.entries(secondary).map(([key, cat]) => (
        <div key={key}>
            {
                cat.reduce((acc: any, { display, key }: any) => {
                    const label = display ? `${display}: ` : ''
                    const displayVal = `${label}${getDisplayUnit(currentWeather[key], key)}`
                    const initial = acc ? `${acc} | ` : ''
                    return `${initial}${displayVal}`
                }, '')
            }
        </div>
    ))

    const renderFavoriteButton = () => {
        const { stationIdentifier } = station
        if (!authUser) { return null }
        if (isFavorite) {
            return (
                <span>{emoji.star}</span>
            )
        }
        return (
            <FavoriteBtn onClick={handleSave(stationIdentifier)}>save</FavoriteBtn>
        )
    }

    const renderStation = () => {
        const { name, stationIdentifier } = station
        return (
            <Info> {renderFavoriteButton()} {name} | {stationIdentifier}</Info>
        )
    }

    const renderTime = () => {
        const formatted = moment(timestamp).format('D MMM HH:mma')
        return (
            <Info>as of {formatted} </Info>
        )
    }

    return (
        <Container>
            <Title>Current Conditions<Reload onClick={handleGetWeather}>{emoji.reload}</Reload></Title>
            {renderStation()}
            <Spacer>
                {renderTime()}
            </Spacer>
            <Spacer>
                {renderMain()}
            </Spacer>
            {renderSecondary()}

        </Container>
    )
}

export default Current
