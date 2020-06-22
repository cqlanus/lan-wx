import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import Input from '../Input'
import { buttonStyle } from '../Button'

import { addDevice, getDevices, } from '../../redux/slice/pws'
import { selectPwsDevices } from '../../redux/selectors'

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

const Submit = styled.input`
    ${buttonStyle}
`
const Settings = () => {
    const dispatch = useDispatch()
    const devices = useSelector(selectPwsDevices)
    const [macAddress, setMacAddress] = useState('')
    const [apiKey, setApiKey] = useState('')
    useEffect(() => {
        dispatch(getDevices())
    }, [])
    const handleMacAddress = (e: any) => setMacAddress(e.target.value)
    const handleApiKey = (e: any) => setApiKey(e.target.value)
    const handleSearch = () => {
        if (macAddress && apiKey) {
            dispatch(addDevice({ macAddress, apiKey }))
        }
    }
    return (
        <Container>
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

        </Container>
    )
}

export default Settings
