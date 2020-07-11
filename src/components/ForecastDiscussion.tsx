import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import Loader from './Loader'

import { getForecastDiscussion } from '../redux/slice/forecast'
import { selectForecastDiscussion, selectCoords } from '../redux/selectors'
import type { Discussion } from '../types/forecast'

const Container = styled.div`
    padding: 0 0.5rem;
`
const SectionContainer = styled.div`
    margin-bottom: 1rem;
`
const Title = styled.h3``
const SectionHeader = styled.div`
    font-weight: bold;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`
const Text = styled.p`
    line-height: 1.2rem;
    text-align: left;
`

type SectionProps = { header: string, textArray: string[] }
const Section = ({ header, textArray }: SectionProps) => {
    const [ isOpen, setOpen ] = useState(false)
    const toggleOpen = () => setOpen(!isOpen)
    return (
        <SectionContainer>
            <SectionHeader onClick={toggleOpen}>{header}</SectionHeader>
            {
                isOpen && textArray.map((t, idx) => <Text key={idx}>{t}</Text>)
            }
        </SectionContainer>
    )
}

const ForecastDiscussion = (p: any) => {
    const dispatch = useDispatch()
    const coords = useSelector(selectCoords)
    const discussion: Discussion | undefined = useSelector(selectForecastDiscussion)
    useEffect(() => {
        dispatch(getForecastDiscussion())
    }, [coords, dispatch])

    if (!discussion) { return <Loader/> }

    return (
        <Container>
            <Title>Forecast Discussion</Title>
            {
                Object.entries(discussion).map(([header, textArray]) => <Section key={header} header={header} textArray={textArray} />)
            }
        </Container>
    )
}

export default ForecastDiscussion
