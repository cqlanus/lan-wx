import React, { useMemo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
/* import { useParams, } from 'react-router' */
import { format } from 'date-fns-tz'

/* import BottomNav from './BottomNav'
 * import Button from './Button'
 * import Select from './Select' */
import Loader from './Loader'
import Table from './Table'

import { getPositions } from '../redux/slice/astronomy'
import { selectPositions, selectCoords } from '../redux/selectors'
import type { BodyPosition } from '../types/astronomy'

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

    if (!positions) { return <Loader /> }
    const title = `Astronomical Positions -- ${format(new Date(), 'HH:mm')}`

    return (
        <div>
            <h3>{title}</h3>
            <Table columns={columns} data={data} />
        </div>
    )
}

export default AllPositions
