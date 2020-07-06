import React, { ReactElement, useMemo } from 'react'
import moment from 'moment'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'

import OptionContainer from './OptionsContainer'
import Button from './Button'
import Select from './Select'
import { UpperAirLegend, SurfaceLegend, SkewTLegend } from './UpperAirLegend'

import { formatUtcHour } from '../utils'

const OptionTitle = styled.div`
    text-decoration: underline;
    margin-bottom: 0.5rem;
`

const OptionLabel = styled.label`
    margin-left: 0.5rem;
`

const Flex = styled.div`
    flex: 1;
`

const ButtonGroup = styled.div`
    display: flex;
    align-items: center;
    padding-top: 0.5rem;
`

const BottomButton = styled(Button)`
    color: black;
    flex: 1;

    &:hover: {
         font-weight: bold;
    }
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
    const time = selectedOptions.timeOfDay
    const INCREMENT = 3
    const MIN = 0
    const MAX = 21
    const dispatch = useDispatch()
    const timeOfDay = useMemo(() => {
        return SURFACE_OPTIONS.timeOfDay.find(t => t.value === time)
    }, [time])
    const inc = () => {
        const newTime = +time + INCREMENT
        if (newTime < MAX) {
            const formattedHour = formatUtcHour(newTime, 2)
            dispatch(handleSelect('timeOfDay', formattedHour))
        } else {
            const formattedHour = formatUtcHour(MIN, 2)
            dispatch(handleSelect('timeOfDay', formattedHour))
        }
    }
    const dec = () => {
        const newTime = +time - INCREMENT
        if (newTime >= MIN) {
            const formattedHour = formatUtcHour(newTime, 2)
            dispatch(handleSelect('timeOfDay', formattedHour))
        } else {
            const formattedHour = formatUtcHour(MAX, 2)
            dispatch(handleSelect('timeOfDay', formattedHour))
        }

    }
    return (
        <div>
            <OptionContainer vertical>
                <SurfaceLegend />
                <div>
                    <OptionTitle>Show Sfc Obs?</OptionTitle>

                    <input onChange={handleSelect('surfaceObservations', true)} checked={selectedOptions.surfaceObservations === true} type="radio" name={'Yes'} value={'Yes'} />
                    <OptionLabel>{'Yes'}</OptionLabel>
                    <input onChange={handleSelect('surfaceObservations', false)} checked={selectedOptions.surfaceObservations === false} type="radio" name={'No'} value={'No'} />
                    <OptionLabel>{'No'}</OptionLabel>
                </div>
                <div>
                    <OptionTitle>Time</OptionTitle>
                    <ButtonGroup>
                        <BottomButton onClick={dec}>{'<'}</BottomButton>
                        <Flex>
                            {timeOfDay && `${timeOfDay.time}|${timeOfDay.display}`}
                        </Flex>
                        <BottomButton onClick={inc}>{'>'}</BottomButton>
                    </ButtonGroup>
                </div>
            </OptionContainer>
        </div>

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
        <OptionContainer vertical>
            <SkewTLegend />
            <div>
                <OptionTitle>Time</OptionTitle>
                {
                    SKEW_T_OPTIONS.timeOfDay.map(t => (
                        <TimeOfDay
                            key={t.value}
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
    const dispatch = useDispatch()
    return (
        <div>
            <OptionContainer>

                <div>
                    <OptionTitle>Isobar</OptionTitle>
                    <Select value={selectedOptions.isobar} onChange={(e: any) => dispatch(handleSelect('isobar', e.target.value))} >
                        {
                            UPPER_AIR_OPTIONS.isobar.map(i => {
                                return <option key={i} value={i}>{i}mb</option>
                            })
                        }
                    </Select>
                </div>
                <div>
                    <OptionTitle>Time</OptionTitle>
                    {
                        UPPER_AIR_OPTIONS.timeOfDay.map(t => (
                            <TimeOfDay
                                key={t.value}
                                time={t}
                                handleSelect={handleSelect}
                                selectedOptions={selectedOptions} />
                        ))
                    }
                </div>
            </OptionContainer>
            <UpperAirLegend isobar={selectedOptions.isobar} />
        </div>

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
