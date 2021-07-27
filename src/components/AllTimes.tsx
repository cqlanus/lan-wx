import React, { useMemo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Table from './Table'

import { getTimes } from '../redux/slice/astronomy'
import { selectTimes, selectCoords } from '../redux/selectors'
import { localFormattedTime } from '../utils/time'


const tableStructure = [
    {
        Header: 'Body',
        accessor: 'title',
    },
    {
        Header: 'Rise',
        accessor: ({ rise }: { rise: Date }) => localFormattedTime(rise),
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
        accessor: ({ set }: { set: Date }) => localFormattedTime(set),
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

    if (!times) { return <Loader /> }

    return (
        <div>
            <h3>Astronomical Times</h3>
            <Table columns={columns} data={data} />

        </div>
    )
}

export default AllTimes
