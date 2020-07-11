import React from 'react'
import styled, { keyframes } from 'styled-components'

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const blink = keyframes`
    0% {
        opacity: 0.2;
    }
    20% {
        opacity: 1;
    }
    100% {
        opacity: 0.2;
    }
`

const Dot = styled.span`
    font-size: 3rem;
    animation-name: ${blink};
    animation-duration: 1.4s;
    animation-iteration-cound: infinite;
    animation-fill-mode: both;

    &:nth-child(2) {
        animation-delay: 0.2s;
    }
    &:nth-child(3) {
        animation-delay: 0.4s;
    }
`

const Loader = () => {
    return (
        <Container>
            <Dot>.</Dot>
            <Dot>.</Dot>
            <Dot>.</Dot>
        </Container>
    )
}

export default Loader
