import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withAuthenticator } from '@aws-amplify/ui-react'
import styled from 'styled-components'

import Input from '../Input'
import { buttonStyle } from '../Button'

import { addDevice, getDevices, } from '../../redux/slice/pws'
import { setLocation } from '../../redux/slice/location'
import { removeFavorite } from '../../redux/slice/user'
import { logout } from '../../redux/slice/auth'
import { selectPwsDevices, selectFavoriteStations } from '../../redux/selectors'
import { Link } from 'react-router-dom'
import { divide } from 'ramda'
import emoji from '../../data/emoji'

const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
`

const SubContainer = styled.div`
    margin-bottom: 2rem;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
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
    color: black;

    &:hover {
        font-weight: bold;
    }
`

const Submit = styled.input`
    ${buttonStyle}
`
const Settings = () => {
    const dispatch = useDispatch()
    const devices = useSelector(selectPwsDevices)
    const stations: any[] = useSelector(selectFavoriteStations)
    const [macAddress, setMacAddress] = useState('')
    const [apiKey, setApiKey] = useState('')
    useEffect(() => {
        dispatch(getDevices())
    }, [dispatch])
    const handleMacAddress = (e: any) => setMacAddress(e.target.value)
    const handleApiKey = (e: any) => setApiKey(e.target.value)
    const handleSearch = () => {
        if (macAddress && apiKey) {
            dispatch(addDevice({ macAddress, apiKey }))
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

    const renderFavorites = () => {
        return (
            <SubContainer>
                <h4>Favorite Stations</h4>
                {
                    stations.map(station => {
                        console.log({ station })
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
                <Form onSubmit={handleSearch}>
                    <InputGroup>
                        <Label>MAC Address:</Label>
                        <StyledInput value={macAddress} onChange={handleMacAddress} />
                    </InputGroup>
                    <InputGroup>
                        <Label>API Key:</Label>
                        <StyledInput value={apiKey} onChange={handleApiKey} />
                    </InputGroup>
                    <Submit type="submit" />
                </Form>
            </SubContainer>
        )
    }

    return (
        <Container>
            {renderDevices()}
            {renderAddDevice()}
            {renderFavorites()}
            <LogoutContainer>
                <Logout to="/home/current" onClick={handleLogout}>Logout</Logout>
            </LogoutContainer>
        </Container>
    )
}

export default withAuthenticator(Settings)
