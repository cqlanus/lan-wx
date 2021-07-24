import React from 'react'
import type { ChangeEvent } from 'react'
import { withRouter } from 'react-router'

import OptionsContainer from './OptionsContainer'
import Select from './Select'

type Props = {
    history: any
}
const AstroSummaryOptions = ({ history }: Props) => {
    const summaries = [ 'moon', 'sun' ]
    const handleSelect = (e: any) => {
        const { value } = e.target
        const path = `/astronomy/summary/${value}`
        history.push(path)
    }
    return (
        <OptionsContainer>
            <Select onChange={handleSelect}>
                {
                    summaries.map(s => (
                        <option key={s} value={s}>{s}</option>
                    ))
                }
            </Select>
        </OptionsContainer>
    )
}

export type AST_OPTIONS = {
    summary: any,
    times: null
    positions: null,
    charts: null,
}
export const ASTRO_OPTIONS: AST_OPTIONS = {
    summary: withRouter(AstroSummaryOptions),
    times: null,
    positions: null,
    charts: null,
}
