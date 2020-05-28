import React, { ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Select from './Select'
import OptionContainer from './OptionsContainer'

import { setDaysAhead } from './../redux/slice/forecast'
import { selectDaysAhead } from './../redux/selectors'

const daysAheadOptions = Array.from({ length: 8 }, (_, idx: number) => idx + 1)
const DetailsOptions = () => {
    const dispatch = useDispatch()
    const daysAhead = useSelector(selectDaysAhead)
    const handleSelect = (e: any) => dispatch(setDaysAhead(e.target.value))
    return (
        <OptionContainer>
            <Select onChange={handleSelect} value={daysAhead} >
                {
                    daysAheadOptions.map(d => {
                        const display = d === 0 ? `${d} day forecast` : `${d} days forecast`
                        return (
                            <option key={d} value={d}>{display}</option>
                        )
                    })
                }
            </Select>
        </OptionContainer>
    )
}
export type FO_OPTIONS = {
    details: (p: any) => ReactElement,
    discussion: null
}
export const FORECAST_OPTIONS: FO_OPTIONS = {
    details: DetailsOptions,
    discussion: null
}
