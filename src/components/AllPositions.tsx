import React, { useMemo, useState, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { format, parse } from 'date-fns'

import Loader from './Loader'
import Table from './Table'
import emoji from '../data/emoji'

import { getPositions, } from '../redux/slice/astronomy'
import { selectPositions, selectCoords, } from '../redux/selectors'

import type { BodyPosition } from '../types/astronomy'

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
`

const Input = styled.input`
    padding: 0.25rem 1rem;
    font-size: 1rem;
`

const EmojiBtn = styled.div`
    font-size: 1.5rem;
    padding: 0 0.5rem;
    cursor: pointer;
`

const tableStructure = [
    {
        Header: 'Body',
        accessor: 'title',
    },
    {
        Header: 'Altitude',
        accessor: (thing: BodyPosition) => {
            const { alt } = thing
            return `${alt.toFixed(2)}°`
        },
        id: 'alt'
    },
    {
        Header: 'Azimuth',
        accessor: ({ az }: BodyPosition) => `${az.toFixed(2)}°`,
        id: 'az'
    },
    {
        Header: 'Right Ascension',
        accessor: ({ ra }: BodyPosition) => `${ra.toFixed(2)}°`,
        id: 'ra'
    },
    {
        Header: 'Declination',
        accessor: ({ dec }: BodyPosition) => `${dec.toFixed(2)}`,
        id: 'dec'
    },
]

const AllPositions = () => {
    const [time, setTime] = useState(new Date())
    const dispatch = useDispatch()
    const coords = useSelector(selectCoords)
    const positions = useSelector(selectPositions)
    useEffect(() => {
        dispatch(getPositions(time))
    }, [dispatch, coords])

    const handleSetTime = (e: any) => {
        const { value } = e.target
        const parsed = parse(value, "HH:mm:ss", new Date())
        setTime(parsed)
    }

    const handleReset = () => setTime(new Date())
    const handleClick = () => dispatch(getPositions(time))

    const data = useMemo(() => {
        if (positions) {
            const { date, ...rest } = positions
            return Object.entries(rest).reduce((acc: any, entry: any) => {
                const [key, val] = entry;
                return [...acc, { title: key, ...val }]
            }, [])
        }
        return []
    }, [positions])
    const columns: any = useMemo(() => tableStructure, [])

    if (!positions) { return <Loader /> }
    const title = 'Astronomical Positions'

    return (
        <div>
            <h3>{title}</h3>

            <InputContainer>
                <EmojiBtn onClick={handleReset}>{emoji.reload}</EmojiBtn>
                <Input
                    onChange={handleSetTime}
                    type="time"
                    name="time"
                    value={format(time, "HH:mm:ss")}
                />
                <EmojiBtn onClick={handleClick}>{emoji.arrow.e}</EmojiBtn>
            </InputContainer>
            <Table columns={columns} data={data} />
        </div>
    )
}

export default AllPositions
