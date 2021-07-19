import React from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'

import getTheme from '../themes'

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

const TableComponent = ({ columns, data }: any) => {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data })

    return (
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
    )
}

export default TableComponent
