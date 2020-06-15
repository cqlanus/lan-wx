import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'

import Button, { buttonStyle } from './Button'
import { getLocation } from '../redux/slice/location'

const Container = styled.form`
    display: flex;
    margin-right: 1px;
`
const SearchBar = styled.input`
    flex: 1;
    font-family: monospace;
    font-size: 1rem;
    padding: 0 0.5rem;
`

const Submit = styled.input`
    ${buttonStyle}
`

const LocationSearch = () => {
    const [location, setLocation] = useState('')
    const dispatch = useDispatch()
    const handleChange = (e: any) => setLocation(e.target.value)
    const handleSearch = () => {
        if (!location) { return }
        dispatch(getLocation(location))
    }

    return (
        <Container onSubmit={handleSearch}>
            <SearchBar
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
