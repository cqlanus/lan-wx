import React from 'react'
import { useHistory, useLocation, } from 'react-router'

import OptionsContainer from './OptionsContainer'
import Select from './Select'

const AstroSummaryOptions = () => {
    const history = useHistory()
    const { pathname } = useLocation()
    const pathArr = pathname.split('/')
    const current = pathArr[pathArr.length - 1]
    const summaries = [ 'moon', 'sun' ]
    const handleSelect = (e: any) => {
        const { value } = e.target
        const path = `/astronomy/summary/${value}`
        history.push(path)
    }
    return (
        <OptionsContainer>
            <Select value={current} onChange={handleSelect}>
                {
                    summaries.map(s => (
                        <option key={s} value={s}>{s}</option>
                    ))
                }
            </Select>
        </OptionsContainer>
    )
}

const BodiesOptions = () => {
    const history = useHistory()
    const { pathname } = useLocation()
    const pathArr = pathname.split('/')
    const current = pathArr[pathArr.length - 1]
    const options = [ 'times', 'positions' ]
    const handleSelect = (e: any) => {
        const { value } = e.target
        const path = `/astronomy/bodies/${value}`
        history.push(path)
    }
    return (
        <OptionsContainer>
            <Select value={current} onChange={handleSelect}>
                {
                    options.map(s => (
                        <option key={s} value={s}>{s}</option>
                    ))
                }
            </Select>
        </OptionsContainer>
    )
}

export type AST_OPTIONS = {
    summary: any,
    bodies: any,
    conditions: any,
}
export const ASTRO_OPTIONS: AST_OPTIONS = {
    summary: AstroSummaryOptions,
    bodies: BodiesOptions,
    conditions: null,
}
