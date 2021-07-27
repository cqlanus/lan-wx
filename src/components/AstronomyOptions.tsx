import React from 'react'
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

const BodiesOptions = ({ history }: Props) => {
    const options = [ 'times', 'positions' ]
    const handleSelect = (e: any) => {
        const { value } = e.target
        const path = `/astronomy/bodies/${value}`
        history.push(path)
    }
    return (
        <OptionsContainer>
            <Select onChange={handleSelect}>
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
    bodies: any
}
export const ASTRO_OPTIONS: AST_OPTIONS = {
    summary: withRouter(AstroSummaryOptions),
    bodies: withRouter(BodiesOptions),
}
