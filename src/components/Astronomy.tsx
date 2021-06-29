import React, { useEffect, useMemo } from 'react'
import styled, { css } from 'styled-components'
import moment from 'moment'
import { useTable } from 'react-table'
import { useDispatch, useSelector } from 'react-redux'

import Loader from './Loader'

import { getAstronomy } from '../redux/slice/climate'
import { selectAstronomy, selectCoords, selectDayLengths, selectMoonPhase, selectTomorrowLength, selectAstronoyPosition } from '../redux/selectors'
import getTheme from '../themes'
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
    night: {
        title: 'Night',
        first: formatAstro('night', astroData),
        second: formatAstro('nightEnd', astroData),
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

const Container = styled.div`
    margin-bottom: 7rem;
`

const Table = styled.table`
    width: 100%;
`

const TableContainer = styled.div`
    overflow-x: auto;
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

const flex = css`
    display: flex;
    align-items: center;
`

const MoonPhaseContainer = styled.div`
    ${flex}
    justify-content: space-around;
    margin-left: 0.5rem;
`

const Bold = styled.span`
    font-weight: bold;
`

const DetailsTable = styled.table`
    width: 100%;
    padding: 0 0.5rem;
`

const TitleCell = styled.td`
    width: 1%;
    white-space: nowrap;
`
const Astronomy = () => {

    const dispatch = useDispatch()
    const coords = useSelector(selectCoords)
    const astronomy = useSelector(selectAstronomy)
    const astroPosition = useSelector(selectAstronoyPosition)
    const [visibleLight, lengthOfDay] = useSelector(selectDayLengths)
    const [moonFraction, moonPhase] = useSelector(selectMoonPhase)
    const compareStatement = useSelector(selectTomorrowLength)
    useEffect(() => {
        dispatch(getAstronomy())
    }, [dispatch, coords])
    const data = useMemo(() => {
        if (astronomy) {
            const { moon, night, ...astroMap } = ASTRO_TABLE_MAPPING(astronomy)
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
                night,
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

    if (data.length === 0) { return <Loader/> }

    const renderSunDetails = () => {
        if (!astroPosition) { return null }
        const { azimuth, altitude, } = astroPosition
        return (
            <div>
                <h3>{Emoji.weather.sunny} Details</h3>
                <DetailsTable>
                    <tbody>
                        <tr>
                            <TitleCell>
                                <Bold>{`Pos ${Emoji.arrow.e}`}</Bold>
                            </TitleCell>
                            <td>

                                <div> <Bold>{'Az: '}</Bold> {azimuth.value} </div>
                            </td>
                            <td>

                                <div> <Bold>{'Alt: '}</Bold> {altitude.value} deg</div>
                            </td>
                        </tr>
                        <tr>
                            <TitleCell>
                                <Bold >{`Day ${Emoji.arrow.e}`}</Bold>
                            </TitleCell>
                            <td colSpan={2}> {compareStatement} </td>
                        </tr>
                    </tbody>
                </DetailsTable>
            </div>
        )
    }

    const renderMoonDetails = () => {

        if (!astroPosition) { return null }
        const { moon_azimuth, moon_altitude } = astroPosition
        const { icon, name } = moonPhase || {}
        return (
            <div>
                <h3>{Emoji.moonPhases.fullMoon} Details</h3>
                <DetailsTable>
                    <tbody>
                        <tr>
                            <TitleCell>
                                <Bold>{`Pos ${Emoji.arrow.e}`}</Bold>
                            </TitleCell>
                            <td>

                                <div> <Bold>{'Az: '}</Bold> {moon_azimuth.value} </div>
                            </td>
                            <td>

                                <div> <Bold>{'Alt: '}</Bold> {moon_altitude.value} deg</div>
                            </td>
                        </tr>
                        <tr>
                            <TitleCell>
                                <Bold >{`Phase ${Emoji.arrow.e}`}</Bold>
                            </TitleCell>
                            <td>
                                <MoonPhaseContainer>
                                    <div>
                                        {` ${icon} `}
                                    </div>
                                    <div>
                                        {name}
                                    </div>
                                </MoonPhaseContainer>
                            </td>
                            <td>{moonFraction} of the moon is illuminated </td>

                        </tr>
                    </tbody>
                </DetailsTable>
            </div>
        )

    }

    return (
        <Container>
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
            {renderSunDetails()}
            {renderMoonDetails()}
        </Container>
    )
}

export default Astronomy
