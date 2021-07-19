import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import Loader from './Loader'
import Table from './Table'

import { getRecentWeather } from '../redux/slice/weather'
import { getAlmanac } from '../redux/slice/climate'
import { selectAlmanac, selectCoords, } from '../redux/selectors'

type Alm = {
    [key: string]: {
        [key: string]: {
            [key: string]: string
        }
    }
}

const Container = styled.div`
    margin-bottom: 4rem;
`

const MetaContainer = styled.div`
  padding: 1rem;
`

const HeaderContainer = styled.div` `
const TableHeader = (title: string) => () => {
    return (
        <HeaderContainer>
            {
                title.split(' ').map((word, idx) => <div key={idx}>{word}</div>)
            }
        </HeaderContainer>
    )
}

const tableStructure = [
    {
        accessor: 'title',
    },
    {
        Header: TableHeader('Observed'),
        accessor: 'observed',
    },
    {
        Header: TableHeader('Time'),
        accessor: 'time',
    },
    {
        Header: TableHeader('Normal Value'),
        accessor: 'normalValue',
    },
    {
        Header: TableHeader('Departure'),
        accessor: 'departure',
    },
    {
        Header: TableHeader('Record value'),
        accessor: 'recordValue',
    },
    {
        Header: TableHeader('Year'),
        accessor: 'recordYear',
    },
]

const Almanac = () => {
    const dispatch = useDispatch()
    const coords = useSelector(selectCoords)
    const almanac: Alm = useSelector(selectAlmanac)
    useEffect(() => {
        dispatch(getRecentWeather())
        dispatch(getAlmanac())
    }, [dispatch, coords])

    const { meta } = almanac || {}
    const data = React.useMemo(() => {
        if (almanac) {
            const { sun, meta, ...alm } = almanac
            const test = Object.entries(alm).reduce((acc: any, entry) => {
                const [catKey, catVal] = entry
                const catRow = { title: catKey.toUpperCase(), isTitleRow: true }
                const values = Object.values(catVal)
                return [...acc, catRow, ...values]
            }, [])
            return test
        }
        return []
    }, [almanac])
    const columns = React.useMemo(() => tableStructure, [])

    if (data.length === 0) { return <Loader/> }

    const renderMeta = () => {
        if (!meta) { return null }
        return (
            <MetaContainer>
                <h4>{meta.title.title.replace(/\.{3}/g, '')}</h4>
                <em>as of {meta.timestamp.title}</em>
            </MetaContainer>
        )
    }

    return (
        <Container>
            {renderMeta()}
            <Table columns={columns} data={data} />
        </Container>
    )
}

export default Almanac
