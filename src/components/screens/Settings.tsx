import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withAuthenticator } from '@aws-amplify/ui-react'
import styled from 'styled-components'

import Input from '../Input'
import Button, { buttonStyle } from '../Button'

import { addDevice } from '../../redux/slice/pws'
import { setLocation } from '../../redux/slice/location'
import { removeFavorite, setTheme } from '../../redux/slice/user'
import { logout } from '../../redux/slice/auth'
import { selectPwsDevices, selectFavoriteStations, selectTheme } from '../../redux/selectors'
import { Link } from 'react-router-dom'

import getTheme from '../../themes'
import emoji from '../../data/emoji'

const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
`

const SubContainer = styled.div`
    margin-bottom: 2rem;
    padding: 0.5rem;
`

const InputGroup = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
`

const Label = styled.label`
    margin-right: 0.5rem;
`

const StyledInput = styled(Input)`
    flex: 1;
`
const Title = styled.h4`
    margin-bottom: 0;
`

const Logout = styled(Link)`
    ${buttonStyle};
`
const LogoutContainer = styled.div`
    margin-top: 1rem;
`

const Remove = styled.span`
    cursor: pointer;
    margin-left: 0.5rem;
`

const Select = styled(Link)`
    text-decoration: none;
    color: ${() => getTheme().fg};

    &:hover {
        font-weight: bold;
    }
`

const Submit = styled(Button)`
    ${buttonStyle}
`
const Settings = () => {
    const dispatch = useDispatch()
    const devices = useSelector(selectPwsDevices)
    const stations: any[] = useSelector(selectFavoriteStations)
    const theme = useSelector(selectTheme)

    const [macAddress, setMacAddress] = useState('')
    const [apiKey, setApiKey] = useState('')

    const handleMacAddress = (e: any) => setMacAddress(e.target.value)
    const handleApiKey = (e: any) => setApiKey(e.target.value)
    const handleSearch = () => {
        if (macAddress && apiKey) {
            console.log({ macAddress, apiKey })
            dispatch(addDevice({ macAddress, apiKey }))
            setMacAddress('')
            setApiKey('')
        }
    }

    const handleLogout = () => {
        dispatch(logout())
    }

    const handleRemoveFavorite = (station: any) => () => {
        dispatch(removeFavorite(station))
    }

    const handleSelectStation = (station: any) => () => {
        const { lat_prp, lon_prp } = station
        dispatch(setLocation({ latitude: lat_prp, longitude: lon_prp }))
    }

    const toggleTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light'
        dispatch(setTheme(nextTheme))
    }

    const renderFavorites = () => {
        return (
            <SubContainer>
                <h4>Favorite Stations</h4>
                {
                    stations.map(station => {
                        return (
                            <div key={station.id}>
                                <Select
                                    to="/home/current"
                                    onClick={handleSelectStation(station)}
                                >{`${station.station_name_current} | ${station.icao}`}</Select>
                                <Remove onClick={handleRemoveFavorite(station)}>{emoji.x}</Remove>
                            </div>
                        )
                    })
                }
            </SubContainer>
        )
    }

    const renderDevices = () => {
        return (
            <SubContainer>
                <h4>Existing devices</h4>
                {
                    devices.length > 0
                        ? devices.map(dev => {
                            return (
                                <div key={dev.macAddress}>
                                    {`MAC Address: ${dev.macAddress}`}
                                </div>
                            )
                        })
                        : <em>None</em>
                }
            </SubContainer>
        )
    }

    const renderAddDevice = () => {

        return (
            <SubContainer>
                <Title>Add a PWS</Title>
                <InputGroup>
                    <Label>MAC Address:</Label>
                    <StyledInput value={macAddress} onChange={handleMacAddress} />
                </InputGroup>
                <InputGroup>
                    <Label>API Key:</Label>
                    <StyledInput value={apiKey} onChange={handleApiKey} />
                </InputGroup>
                <Submit onClick={handleSearch} >Submit</Submit>
            </SubContainer>
        )
    }

    const renderUISettings = () => {
        const isDark = theme === 'dark'
        return (
            <SubContainer>
                <Title>UI Settings</Title>
                <InputGroup>
                    <Label>Dark Mode:</Label>
                    <input type="checkbox" checked={isDark} onChange={toggleTheme} />
                </InputGroup>
            </SubContainer>
        )
    }

    return (
        <Container>
            {renderDevices()}
            {renderAddDevice()}
            {renderFavorites()}
            {renderUISettings()}
            <LogoutContainer>
                <Logout to="/home/current" onClick={handleLogout}>Logout</Logout>
            </LogoutContainer>
        </Container>
    )
}

export default withAuthenticator(Settings)
