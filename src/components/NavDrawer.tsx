import React, { useState } from 'react'
import styled from 'styled-components'
import Button from './Button'

const PAGES = {
    home: { path: '/', display: 'Home' },
    forecast: { path: '/forecast', display: 'Forecast' },
    charts: { path: '/charts', display: 'Charts' },
    climate: { path: '/climate', display: 'Climate' },
    map: { path: '/map', display: 'Map' }
}

const Trigger = styled(Button)``

type DrawerProps = { isOpen: boolean }
const Drawer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    overflow-x: hidden;
    height: ${(p: DrawerProps) => p.isOpen ? '100vh' : '0'};
    background-color: white;
    width: 100vw;
    transition: 0.5s;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-left: 1rem;
    z-index: 100;
`

const Link = styled.a`
    color: black;
    text-decoration: none;
    margin-top: 1rem;
    border-bottom: 1px dashed black;

    &:hover {
    font-weight: bold;
    }
`

const Dismiss = styled(Link)`
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 2rem;
    border-bottom: none;
`

const NavDrawer = () => {
    const [isOpen, setOpen] = useState(false)
    const toggleOpen = () => setOpen(!isOpen)
    return (
        <div>
            <Trigger onClick={toggleOpen}>Menu</Trigger>
            <Drawer isOpen={isOpen}>
                <Dismiss onClick={toggleOpen}>✕</Dismiss>
                {
                    Object.entries(PAGES).map(([k, p]) => <Link key={k} onClick={toggleOpen} href={`#${p.path}`}>{p.display}</Link>)
                }
            </Drawer>
        </div>
    )
}

export default NavDrawer
