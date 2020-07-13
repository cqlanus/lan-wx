import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'

import { buttonStyle } from './Button'
import Input from './Input'
import { getLocation } from '../redux/slice/location'

const Container = styled.form`
    display: flex;
    margin-right: 1px;
    margin-top: 2.2rem;
`

const Submit = styled.input`
    ${buttonStyle};
    border-top: none;
    border-radius: 0;
`

const LocationSearch = () => {
    const [location, setLocation] = useState('')
    const dispatch = useDispatch()
    const handleChange = (e: any) => setLocation(e.target.value)
    const handleSearch = (e: any) => {
        e.preventDefault()
        if (!location) { return }
        dispatch(getLocation(location))
    }

    return (
        <Container onSubmit={handleSearch}>
            <Input
                placeholder="current location"
                onChange={handleChange}
                onSubmit={handleSearch} />
            <Submit
                disabled={!location}
                type="submit"
                onClick={handleSearch}
                value=">" />
        </Container>
    )
}

export default LocationSearch
