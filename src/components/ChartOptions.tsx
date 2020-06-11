import React, { ReactElement } from 'react'
import moment from 'moment'
import styled from 'styled-components'
import OptionContainer from './OptionsContainer'

const OptionTitle = styled.div`
    text-decoration: underline;
    margin-bottom: 0.5rem;
`

const OptionLabel = styled.label`
    margin-left: 0.5rem;
`
const getDisplayTime = (hour: number) => moment.utc().hours(hour).local().format('ha')

const isTooEarly = (hour: number) => {
    const localHour = moment.utc().hours(hour).local().hour()
    const currentHour = moment().hour()
    return (currentHour < localHour)
}


type RadioProps = {
    time: { value: string, display: string, time: string, disabled?: boolean },
    handleSelect: any,
    selectedOptions: any,
}
const TimeOfDay = ({ time, handleSelect, selectedOptions }: RadioProps) => {
    return <div key={time.value}>
        <input
            onChange={handleSelect('timeOfDay', time.value)}
            checked={selectedOptions.timeOfDay === time.value}
            type="radio"
            disabled={time.disabled || false}
            name={time.display}
            value={time.value} />

        <OptionLabel>{`${time.time} | ${time.display}`}</OptionLabel>
    </div>
}

// TODO: clean up / refactor options markup - most info can be collected in config object

const SURFACE_OPTIONS = {
    timeOfDay: ['03', '06', '09', '12', '15', '18', '21', '00',].map(utcTime => ({
        value: utcTime,
        display: getDisplayTime(+utcTime),
        time: `${utcTime}Z`,
    })),
    surfaceObservations: ['Include surface analysis', 'Fronts only']
}
const SurfaceOptions = ({ handleSelect, selectedOptions }: any) => {
    return (
        <OptionContainer>
            <div>
                <OptionTitle>Time</OptionTitle>
                {
                    SURFACE_OPTIONS.timeOfDay.map(t => <TimeOfDay
                        time={t}
                        handleSelect={handleSelect}
                        selectedOptions={selectedOptions} />)
                }
            </div>
            <div>
                <OptionTitle>Show Sfc Obs?</OptionTitle>

                <input onChange={handleSelect('surfaceObservations', true)} checked={selectedOptions.surfaceObservations === true} type="radio" name={'Yes'} value={'Yes'} />
                <OptionLabel>{'Yes'}</OptionLabel>
                <input onChange={handleSelect('surfaceObservations', false)} checked={selectedOptions.surfaceObservations === false} type="radio" name={'No'} value={'No'} />
                <OptionLabel>{'No'}</OptionLabel>
            </div>
        </OptionContainer>
    )
}

const SKEW_T_OPTIONS = {
    timeOfDay: [{
        value: 'evening',
        time: '00Z',
        display: getDisplayTime(0),
        disabled: isTooEarly(0)
    }, {
        value: 'morning',
        time: '12Z',
        display: getDisplayTime(12),
        disabled: isTooEarly(12)
    }]

}
const SkewTOptions = ({ handleSelect, selectedOptions }: any) => {
    return (
        <OptionContainer>
            <div>
                <OptionTitle>Time</OptionTitle>
                {
                    SKEW_T_OPTIONS.timeOfDay.map(t => (
                        <TimeOfDay
                            time={t}
                            handleSelect={handleSelect}
                            selectedOptions={selectedOptions} />
                    ))
                }
            </div>
        </OptionContainer>
    )
}

const UPPER_AIR_OPTIONS = {
    isobar: ['925', '850', '700', '500', '300', '200'],
    timeOfDay: [{
        value: 'evening',
        time: '00Z',
        display: getDisplayTime(0),
        disabled: isTooEarly(0)
    }, {
        value: 'morning',
        time: '12Z',
        display: getDisplayTime(12),
        disabled: isTooEarly(12)
    }]
}
const UpperAirOptions = ({ handleSelect, selectedOptions }: any) => {
    return (
        <OptionContainer>
            <div>
                <OptionTitle>Isobar</OptionTitle>
                {
                    UPPER_AIR_OPTIONS.isobar.map(i => {
                        return <div key={i}>
                            <input onChange={handleSelect('isobar', i)} checked={selectedOptions.isobar === i} type="radio" name={i} value={i} />
                            <OptionLabel>{i}mb</OptionLabel>
                        </div>
                    })
                }
            </div>
            <div>
                <OptionTitle>Time</OptionTitle>
                {
                    UPPER_AIR_OPTIONS.timeOfDay.map(t => (
                        <TimeOfDay
                            time={t}
                            handleSelect={handleSelect}
                            selectedOptions={selectedOptions} />
                    ))
                }
            </div>
        </OptionContainer>
    )
}

type OptionsProps = {
    handleSelect: (key: string, value: string) => void,
    selectedOptions: any,
}
type CH_OPTIONS = {
    skewt: (p: OptionsProps) => ReactElement
    upperair: (p: OptionsProps) => ReactElement
    surface: (p: OptionsProps) => ReactElement
}

export const CHART_OPTIONS: CH_OPTIONS = {
    skewt: SkewTOptions,
    upperair: UpperAirOptions,
    surface: SurfaceOptions,
}
