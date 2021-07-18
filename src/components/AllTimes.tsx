import React, { useMemo, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
/* import { useParams, } from 'react-router' */
import { useTable } from 'react-table'
import { utcToZonedTime, format } from 'date-fns-tz'

/* import BottomNav from './BottomNav'
 * import Button from './Button'
 * import Select from './Select' */
import Loader from './Loader'

import { getTimes } from '../redux/slice/astronomy'
import { selectTimes, selectCoords } from '../redux/selectors'
import getTheme from '../themes'

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

const TableCell = styled.td`
    padding: 0.5rem 1rem;
    max-width: 100px;
`
const localFormattedTime = (date: string) => {
    const tz = 'America/Chicago'
    const localDate = utcToZonedTime(date, tz)
    return format(localDate, 'HH:mm')
}


const tableStructure = [
    {
        Header: 'Body',
        accessor: 'title',
    },
    {
        Header: 'Rise',
        accessor: ({ rise }: { rise: string }) => localFormattedTime(rise),
        id: 'rise'
    },
    {
        Header: 'Culm',
        accessor: ({ culm }: { culm: any }) => localFormattedTime(culm.time),
        id: 'culm'
    },
    {
        Header: 'Culm Alt',
        accessor: ({ culm }: { culm: any }) => `${culm.coords.altitude.toFixed(2)}°`,
        id: 'culmAlt'
    },
    {
        Header: 'Set',
        accessor: ({ set }: { set: string }) => localFormattedTime(set),
        id: 'set'
    }
]

const AllTimes = () => {
    const dispatch = useDispatch()
    const coords = useSelector(selectCoords)
    const times = useSelector(selectTimes)
    useEffect(() => {
        dispatch(getTimes())
    }, [dispatch, coords])

    const data = useMemo(() => {
        if (times) {
            return Object.entries(times).reduce((acc: any, entry: any) => {
                const [key, val] = entry;
                return [...acc, { title: key, ...val }]
            }, [])
        }
        return []
    }, [times])
    const columns: any = useMemo(() => tableStructure, [])
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data })

    if (!times) { return <Loader /> }

    return (
        <div>
            <h3>Astronomical Times</h3>
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

                        prepareRow(row)
                        return (
                            <TableRow {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <TableCell {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        )
                    })}

                </tbody>
            </table>

        </div>
    )
}

export default AllTimes
