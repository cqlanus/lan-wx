import React from 'react'
import styled from 'styled-components'

import emoji from '../data/emoji'

const LegendContainer = styled.div`
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Info = styled.div`
    font-size: 0.7rem;
`

const ButtonGroup = styled.div`
    display: flex;
    align-items: center;
    padding-bottom: 0.5rem;
    justify-content: space-around;
    align-self: stretch;
`

const BottomButton = styled.a`
    color: black;
    font-size: 0.7rem;
    text-decoration: underline;
    border: none;

    &:hover: {
         font-weight: bold;
    }
`

type Elements = 'heightContours' | 'heightCodes' | 'isothermsWarm' | 'isothermsCool' | 'relativeHumidityCool' | 'relativeHumidity' | 'windBarbs' | 'airTemp' | 'dewPoint' | 'windContoursLight' | 'windContours' | 'divergence'

type Config = {
    '200': Array<Elements>,
    '300': Array<Elements>,
    '500': Array<Elements>,
    '700': Array<Elements>,
    '850': Array<Elements>,
    '925': Array<Elements>,
}
const UPPER_AIR_CONFIG: Config = {
    '200': ['heightContours', 'windContoursLight', 'windContours', 'windBarbs', 'airTemp', 'dewPoint'],
    '300': ['heightContours', 'windContoursLight', 'windContours', 'windBarbs', 'divergence', 'airTemp', 'dewPoint'],
    '500': ['heightContours', 'heightCodes', 'windBarbs', 'isothermsWarm', 'isothermsCool', 'airTemp', 'dewPoint'],
    '700': ['heightContours', 'heightCodes', 'windBarbs', 'isothermsWarm', 'isothermsCool', 'relativeHumidityCool', 'relativeHumidity', 'airTemp', 'dewPoint'],
    '850': ['heightContours', 'heightCodes', 'windBarbs', 'isothermsWarm', 'isothermsCool', 'relativeHumidityCool', 'relativeHumidity', 'airTemp', 'dewPoint'],
    '925': ['heightContours', 'heightCodes', 'windBarbs', 'isothermsWarm', 'isothermsCool', 'relativeHumidityCool', 'relativeHumidity', 'airTemp', 'dewPoint'],
}

const UPPER_AIR_ELEMENTS = {
    heightContours: {
        name: 'Height Contours',
        color: '#000000',
        strokeDashArray: '',
    },
    heightCodes: {
        name: 'Height Values',
        color: '#8B008B',
        strokeDashArray: '',
    },
    windContoursLight: {
        name: 'Wind (50kt)',
        color: '#00B2EE',
        strokeDashArray: '',
    },
    windContours: {
        name: 'Wind (>60kt)',
        color: '#1E90FF',
        strokeDashArray: '',
    },
    windBarbs: {
        name: 'Wind Barbs',
        color: '#0000FF',
        strokeDashArray: '',
    },
    airTemp: {
        name: 'Air Temp (C)',
        color: '#FF0000',
        strokeDashArray: '',
    },
    dewPoint: {
        name: 'Dew Point (C)',
        color: '#008B00',
        strokeDashArray: '',
    },
    divergence: {
        name: 'Divergence',
        color: '#EEEE00',
        strokeDashArray: '',
    },
    isothermsWarm: {
        name: 'Isotherms (warm)',
        color: '#FF0000',
        strokeDashArray: '5 5',
    },
    isothermsCool: {
        name: 'Isotherms (cool)',
        color: '#0000FF',
        strokeDashArray: '5 5',
    },
    relativeHumidityCool: {
        name: 'Rel Hum (<0C)',
        color: '#00FF00',
        strokeDashArray: '',
    },
    relativeHumidity: {
        name: 'Rel Hum (>=0C)',
        color: '#008B00',
        strokeDashArray: '',
    }
}

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0.5rem;
    padding-top: 0;
`

type SwatchProps = {
    color: string,
    dashed: boolean,
}
const Swatch = styled.div`
    height: 0.5rem;
    width: 0.5rem;
    background: ${(p: SwatchProps) => !p.dashed && p.color};
    border: ${(p: SwatchProps) => p.dashed && '1px dashed ' + p.color};
    margin-right: 0.5rem;
`

const Item = styled.div`
    font-size: 0.7rem;
    display: flex;
    margin-right: 0.5rem;
`

type Props = {
    isobar: '200' | '300' | '500' | '700' | '850' | '925'
}
export const UpperAirLegend = ({ isobar }: Props) => {
    const elements = UPPER_AIR_CONFIG[isobar]
    const upperAirLink = 'https://www.weather.gov/jetstream/constant_intro'

    return (
        <LegendContainer>
            <Container>
                {
                    elements.map((el: Elements, idx: number) => {
                        const elConfig = UPPER_AIR_ELEMENTS[el]
                        if (!el) { return null }
                        return (
                            <Item key={idx}>
                                <Swatch color={elConfig.color} dashed={!!elConfig.strokeDashArray} />
                                {elConfig.name}
                            </Item>
                        )
                    })
                }
            </Container>    
            <ButtonGroup>
                <Info>Learn More:</Info>
                <BottomButton href={upperAirLink}>Upper Air Info {emoji.arrow.ne}</BottomButton>
            </ButtonGroup>
        </LegendContainer>
        
    )
}

export const SurfaceLegend = () => {
    const frontsLink = 'https://www.wpc.ncep.noaa.gov/html/fntcodes2.shtml'
    const obsLink = 'https://www.wpc.ncep.noaa.gov/html/stationplot.shtml'
    return (
        <LegendContainer>
            <ButtonGroup>
                <Info>Learn More:</Info>
                <BottomButton href={obsLink}>Sfc Obs {emoji.arrow.ne}</BottomButton>
                <BottomButton href={frontsLink}>Fronts {emoji.arrow.ne}</BottomButton>
            </ButtonGroup>

        </LegendContainer>
    )
}


export const SkewTLegend = () => {
    const skewTLink = 'https://www.weather.gov/jetstream/skewt'
    const severeWxLink = 'https://www.weather.gov/jetstream/skewt_severe_max'
    return (
        <LegendContainer>
            <ButtonGroup>
                <Info>Learn More:</Info>
                <BottomButton href={skewTLink}>Skew T Info {emoji.arrow.ne}</BottomButton>
                <BottomButton href={severeWxLink}>Severe WX Info {emoji.arrow.ne}</BottomButton>
            </ButtonGroup>
        </LegendContainer>
    )
}
