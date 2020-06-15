import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'

import Button from './Button'
import { getLocation } from '../redux/slice/location'

const Container = styled.div`
    display: flex;
`
const SearchBar = styled.input`
    flex: 1;
    font-family: monospace;
    font-size: 1rem;
`

const LocationSearch = () => {
    const [ location, setLocation ] = useState('')
    const dispatch = useDispatch()
    const handleChange = (e: any) => setLocation(e.target.value)
    const handleSearch = () => {
        dispatch(getLocation(location))
    }

    return (
        <Container>
            <SearchBar onChange={handleChange} />
            <Button onClick={handleSearch}>></Button>
        </Container>
    )
}

export default LocationSearch
