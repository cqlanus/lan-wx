import React, { useMemo, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
/* import { useParams, } from 'react-router' */
import { useTable } from 'react-table'
import { format } from 'date-fns-tz'

/* import BottomNav from './BottomNav'
 * import Button from './Button'
 * import Select from './Select' */
import Loader from './Loader'

import { getPositions } from '../redux/slice/astronomy'
import { selectPositions, selectCoords } from '../redux/selectors'
import type { BodyPosition } from '../types/astronomy'
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
    const dispatch = useDispatch()
    const coords = useSelector(selectCoords)
    const positions = useSelector(selectPositions)
    useEffect(() => {
        dispatch(getPositions())
    }, [dispatch, coords])

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
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data })

    if (!positions) { return <Loader /> }
    const title = `Astronomical Positions -- ${format(new Date(), 'HH:mm')}`

    return (
        <div>
            <h3>{title}</h3>
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

export default AllPositions
