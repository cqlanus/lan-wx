import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import {
    split,
    compose,
} from 'ramda'

import Button from './Button'
import SlidingModal from './SlidingModal'

import { getAlerts } from '../redux/slice/weather'
import { selectAlerts, selectZoneId } from '../redux/selectors'

const Container = styled.div`
    display: flex;
    justify-content: center;
`

const ContentContainer = styled.div`
    padding: 0 1rem;
    text-align: left;
    font-size: 0.9rem;
`

const Section = styled.div`
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px dashed;
`

const DescTextContainer = styled.div`
    margin-bottom: 0.5rem;
`

const processDescription = compose(
    split('*'),
)

const Alerts = () => {
    const dispatch = useDispatch()
    const alerts = useSelector(selectAlerts)
    const zoneId: string = useSelector(selectZoneId)
    useEffect(() => {
        zoneId && dispatch(getAlerts(zoneId))
    }, [dispatch, zoneId])

    const renderDescText = (str: string) => str.split('...').map((txt: string, idx: number) => {
        const tag = idx === 0 ? 'strong' : 'span'
        const text = idx === 0 ? `${txt}: ` : txt
        return React.createElement(tag, { children: text })
    })

    const renderDescription = (desc: string) => {
        const processed = processDescription(desc)
        return (
            <>
                {processed.filter(Boolean).map((d: string, idx: any) => <DescTextContainer key={idx}>
                    {renderDescText(d)}
                </DescTextContainer>)}
            </>
        )
    }
    return (
        <Container>
            {alerts.map((a: any) => (
                <SlidingModal
                    trigger={(onClick: any) => <Button onClick={onClick}>{a.event}</Button>}
                    showSettings={false}
                    body={() => <ContentContainer>
                        <h4>{a.headline}</h4>
                        <Section> {renderDescription(a.description)} </Section>
                        <div>
                            {a.instruction}
                        </div>
                    </ContentContainer>}
                />
            ))}
        </Container>
    )
}

export default Alerts
