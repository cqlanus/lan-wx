import React, { useState, ReactElement } from 'react'
import { Link as L } from 'react-router-dom'
import styled, { css } from 'styled-components'
import Button from './Button'

import getTheme from '../themes'
import emoji from '../data/emoji'

const Trigger = styled(Button)`
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
`

type DrawerProps = { isOpen: boolean }
const Drawer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    overflow-x: hidden;
    height: ${(p: DrawerProps) => p.isOpen ? '100vh' : '0'};
    background-color: ${() => getTheme().bg};
    width: 100%;
    transition: 0.5s;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 100;
`

const linkStyles = css`
    color: ${() => getTheme().fg};
    text-decoration: none;
    margin-top: 1rem;
    font-size: 1.2rem;
    border-bottom: 1px dashed ${() => getTheme().fg};

    &:hover {
        font-weight: bold;
    }
`

const Link = styled(L)`
    ${linkStyles}
`

const Dismiss = styled.a`
    ${linkStyles}
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 2rem;
    border-bottom: none;
`

const Settings = styled(Link)`
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 1rem;
    border-bottom: none;
    font-size: 1.3rem;
`

type Props = {
    body: any,
    showSettings: boolean,
    trigger: ((p: any) => ReactElement)
}
const SlidingModal = ({
    body,
    showSettings,
    trigger,
}: Props) => {
    const [isOpen, setOpen] = useState(false)

    const toggleOpen = () => setOpen(!isOpen)
    return (
        <div>
            {/* <Trigger onClick={toggleOpen}>Menu</Trigger> */}
            {trigger(toggleOpen)}
            <Drawer isOpen={isOpen}>
                <Dismiss onClick={toggleOpen}>✕</Dismiss>
                {body(toggleOpen)}
                {showSettings && (<Settings onClick={toggleOpen} to="/settings">{emoji.gear}</Settings>)}
            </Drawer>
        </div>
    )
}

export default SlidingModal
