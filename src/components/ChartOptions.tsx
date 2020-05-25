import React, { ReactElement } from 'react'
import styled from 'styled-components'

const OptionContainer = styled.div`
    border: 1px dashed black;
    border-bottom: none;
`

const OptionTitle = styled.div`
    text-decoration: underline;
    margin-bottom: 0.5rem;
`

const OptionLabel = styled.label`
    margin-left: 0.5rem;
`

const UpperAirContainer = styled(OptionContainer)`
    display: flex;
    justify-content: space-around;
    padding: 1rem;
`

const SurfaceOptions = () => {
    return (
        <div />
    )
}

const SKEW_T_OPTIONS = {
    timeOfDay: ['evening', 'morning']
}
const SkewTOptions = ({ handleSelect, selectedOptions }: any) => {
    return (
        <UpperAirContainer>
            <div>
                <OptionTitle>Time</OptionTitle>
                {
                    SKEW_T_OPTIONS.timeOfDay.map(t => {
                        return <div>
                            <input onChange={handleSelect('timeOfDay', t)} checked={selectedOptions.timeOfDay === t} type="radio" name={t} value={t} />
                            <OptionLabel>{t}</OptionLabel>
                        </div>
                    })
                }
            </div>
        </UpperAirContainer>
    )
}

const UPPER_AIR_OPTIONS = {
    isobar: ['925', '850', '700', '500', '300', '200'],
    timeOfDay: ['evening', 'morning']
}
const UpperAirOptions = ({ handleSelect, selectedOptions }: any) => {
    return (
        <UpperAirContainer>
            <div>
                <OptionTitle>Isobar</OptionTitle>
                {
                    UPPER_AIR_OPTIONS.isobar.map(i => {
                        return <div>
                            <input onChange={handleSelect('isobar', i)} checked={selectedOptions.isobar === i} type="radio" name={i} value={i} />
                            <OptionLabel>{i}mb</OptionLabel>
                        </div>
                    })
                }
            </div>
            <div>
                <OptionTitle>Time</OptionTitle>
                {
                    UPPER_AIR_OPTIONS.timeOfDay.map(t => {
                        return <div>
                            <input onChange={handleSelect('timeOfDay', t)} checked={selectedOptions.timeOfDay === t} type="radio" name={t} value={t} />
                            <OptionLabel>{t}</OptionLabel>
                        </div>
                    })
                }
            </div>
        </UpperAirContainer>
    )
}

type OptionsProps = {
    handleSelect: (key: string, value: string) => void,
    selectedOptions: any,
}
type CH_OPTIONS = {
    skewT: ( p: OptionsProps ) => ReactElement
    upperAir: (p: OptionsProps) => ReactElement
    surface: (p: OptionsProps) => ReactElement
}

export const CHART_OPTIONS: CH_OPTIONS = {
    skewT: SkewTOptions,
    upperAir: UpperAirOptions,
    surface: SurfaceOptions,
}
