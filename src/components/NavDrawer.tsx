import React, { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Link as L } from 'react-router-dom'
import styled, { css } from 'styled-components'
import SlidingModal from './SlidingModal'
import Button from './Button'

import { selectHasDevices } from '../redux/selectors'
import getTheme from '../themes'

const PAGES = {
    home: { path: '/', display: 'Home' },
    forecast: { path: '/forecast', display: 'Forecast' },
    pws: { path: '/pws', display: 'PWS' },
    model: { path: '/model', display: 'Model Guidance' },
    map: { path: '/map', display: 'Map' },
    charts: { path: '/charts', display: 'Charts' },
    climate: { path: '/climate', display: 'Climate' },
    astronomy: { path: '/astronomy', display: 'Astronomy' },
}

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

const Trigger = styled(Button)`
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
`

const NavDrawer = () => {
    const [isOpen, setOpen] = useState(false)
    const hasDevices = useSelector(selectHasDevices)

    const toggleOpen = () => setOpen(!isOpen)
    const pages = useMemo(() => {
        if (hasDevices) {
            return PAGES
        } else {
            const { pws, ...updatedPages } = PAGES
            return updatedPages
        }
    }, [hasDevices])

    return (
        <div>
            <SlidingModal
                trigger={(onClick: any) => <Trigger onClick={onClick}>Menu</Trigger>}
                showSettings
                body={(toggleOpen: any) =>
                    Object.entries(pages).map(([k, p]) => <Link key={k} onClick={toggleOpen} to={p.path}>{p.display}</Link>)}
            />
        </div>
    )
}

export default NavDrawer
