import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'
import { useDispatch, useSelector } from 'react-redux'

import Loader from './Loader'

import { getRecentWeather } from '../redux/slice/weather'
import { getAlmanac } from '../redux/slice/climate'
import { selectAlmanac, selectCoords, } from '../redux/selectors'

import getTheme from '../themes'

type Alm = {
    [key: string]: {
        [key: string]: {
            [key: string]: string
        }
    }
}

const MetaContainer = styled.div`
  padding: 1rem;
`

const TableContainer = styled.div`
    overflow-x: auto;
    margin-bottom: 4rem;
`

const HeaderRow = styled.tr`
    background-color: ${() => getTheme().altRow};
`

const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: ${() => getTheme().altRow};
    }
`

const HeaderCell = styled.th`
    height: 100%;
    padding: 0.5rem 1rem;
`

type TC = { isTitleRow: boolean | undefined, isTitleCell: boolean }
const titleStyles = ({ isTitleRow }: TC) => isTitleRow ? `
    font-weight: bold;
    padding-top: 1rem;
    border-bottom: 1px dashed ${() => getTheme().fg};
` : ''

const titleCellStyles = ({ isTitleCell }: TC) => isTitleCell ? `
    text-align: left;
`: ''

const TableCell = styled.td`
    padding: 0.25rem 1rem;
    max-width: 100px;
    ${(p: TC) => titleStyles(p)}
    ${(p: TC) => titleCellStyles(p)}
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
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data })

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
        <div>
            {renderMeta()}
            <TableContainer>
                <table {...getTableProps()}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <HeaderRow {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <HeaderCell {...column.getHeaderProps()}>{column.render('Header')}</HeaderCell>
                                ))}
                            </HeaderRow>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map(row => {
                            const isTitleRow = !!row.original.isTitleRow
                            prepareRow(row)
                            return (
                                <TableRow {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        const isTitleCell = cell.column.id === 'title'
                                        return (<TableCell
                                            isTitleRow={isTitleRow}
                                            isTitleCell={isTitleCell}
                                            {...cell.getCellProps()}
                                        >{cell.render('Cell')}</TableCell>)
                                    })}
                                </TableRow>
                            )
                        })}
                    </tbody>
                </table>
            </TableContainer>
        </div>
    )
}

export default Almanac
