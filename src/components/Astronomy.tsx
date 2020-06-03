import React, { useEffect, useMemo } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { useTable } from 'react-table'
import { useDispatch, useSelector } from 'react-redux'

import { getAstronomy } from '../redux/slice/climate'
import { selectAstronomy, selectCoords, selectDayLengths, selectMoonPhase, selectTomorrowLength } from '../redux/selectors'
import Emoji from '../data/emoji'

type ASTRO_MAP = {
    [key: string]: any
}
const formatAstro = (key: string, data: any): string => moment(data[key]).format('h:mma')
const ASTRO_TABLE_MAPPING: (data: any) => ASTRO_MAP = ({ times: astroData }: any) => ({
    actual: {
        title: 'Actual Time',
        first: formatAstro('sunrise', astroData),
        second: formatAstro('sunset', astroData),
    },
    civil: {
        title: 'Civil Twilight',
        first: formatAstro('dawn', astroData),
        second: formatAstro('dusk', astroData),
    },
    nautical: {
        title: 'Nautical Twilight',
        first: formatAstro('nauticalDawn', astroData),
        second: formatAstro('nauticalDusk', astroData),
    },
    moon: {
        title: 'Moon',
        first: formatAstro('moonrise', astroData),
        second: formatAstro('moonset', astroData),
    }
})

const tableStructure = [
    {
        accessor: 'title',
    },
    {
        Header: 'Rise',
        accessor: 'first',
    },
    {
        Header: 'Set',
        accessor: 'second'
    }
]

const Table = styled.table`
    width: 100%;
`

const TableContainer = styled.div`
    overflow-x: auto;
`

const HeaderRow = styled.tr`
    background-color: #f2f2f2;
`

const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: #f2f2f2;
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
    border-bottom: 1px dashed black;
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

const FlexContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 1rem;
`
const Col = styled.div`
    margin: 0 1rem;
    font-size: 1.5rem;
`
const Astronomy = () => {

    const dispatch = useDispatch()
    const coords = useSelector(selectCoords)
    const astronomy = useSelector(selectAstronomy)
    const [visibleLight, lengthOfDay] = useSelector(selectDayLengths)
    const [moonFraction, moonPhase] = useSelector(selectMoonPhase)
    const compareStatement = useSelector(selectTomorrowLength)
    useEffect(() => {
        dispatch(getAstronomy())
    }, [dispatch, coords])
    const data = useMemo(() => {
        if (astronomy) {
            const { moon, ...astroMap } = ASTRO_TABLE_MAPPING(astronomy)
            const dataObject: ASTRO_MAP = {
                ...astroMap,
                empty: {},
                visibleLight: {
                    title: 'Visible Light',
                    first: visibleLight,
                },
                lengthOfDay: {
                    title: 'Length Of Day',
                    first: lengthOfDay,
                },
                empty2: {},
                moon,
            }
            return Object.values(dataObject)
        }
        return []
    }, [astronomy, lengthOfDay, visibleLight])
    const columns = useMemo(() => tableStructure, [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data })

    const renderMoonPhase = () => {
        const { icon, name } = moonPhase || {}

        return (
            <FlexContainer>
                <Col> {icon} </Col>
                <div>
                    <div>
                        {name}
                    </div>
                    <div>
                        {moonFraction} of the moon is illuminated
                    </div>
                </div>
            </FlexContainer>
        )
    }

    const renderTomorrowLight = () => {
        return (

            <FlexContainer>
                <Col>{Emoji.weather.sunny}</Col>
                <div> {compareStatement} </div>
            </FlexContainer>
        )
    }

    return (
        <div>
            <h3>Astronomy</h3>
            <TableContainer>
                <Table {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup: any) => (
                            <HeaderRow {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column: any) => (
                                    <HeaderCell {...column.getHeaderProps()}>{column.render('Header')}</HeaderCell>
                                ))}
                            </HeaderRow>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row: any) => {
                            const isTitleRow = !!row.original.isTitleRow
                            prepareRow(row)
                            return (
                                <TableRow {...row.getRowProps()}>
                                    {row.cells.map((cell: any) => {
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
                </Table>
            </TableContainer>
            {renderMoonPhase()}
            {renderTomorrowLight()}
        </div>
    )
}

export default Astronomy
