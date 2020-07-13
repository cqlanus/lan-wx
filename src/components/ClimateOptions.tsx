import React, { ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Select from './Select'
import OptionContainer from './OptionsContainer'

import { setMonth } from './../redux/slice/climate'
import { selectNormMonth } from './../redux/selectors'

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]
const NormsOptions = () => {
    const dispatch = useDispatch()
    const normMonth = useSelector(selectNormMonth)
    const handleSelect = (e: any) => dispatch(setMonth(+e.target.value))
    return (
        <OptionContainer>
            <Select onChange={handleSelect} value={normMonth} >
                <option value={undefined}>All Months</option>
                {
                    months.map((d: string, idx: number) => {
                        return (
                            <option key={idx} value={idx}>{d}</option>
                        )
                    })
                }
            </Select>
        </OptionContainer>
    )
}
export type CLIM_OPTIONS = {
    norms: (p: any) => ReactElement,
    almanac: null,
    astronomy: null,
}
export const CLIMATE_OPTIONS: CLIM_OPTIONS = {
    norms: NormsOptions,
    almanac: null,
    astronomy: null,
}
