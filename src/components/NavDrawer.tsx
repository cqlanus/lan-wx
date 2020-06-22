import React, { useState, useMemo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Button from './Button'

import { getDevices } from '../redux/slice/pws'
import { selectHasDevices } from '../redux/selectors'
import emoji from '../data/emoji'

const PAGES = {
    home: { path: '/', display: 'Home' },
    forecast: { path: '/forecast', display: 'Forecast' },
    charts: { path: '/charts', display: 'Charts' },
    climate: { path: '/climate', display: 'Climate' },
    map: { path: '/map', display: 'Map' },
    pws: { path: '/pws', display: 'PWS' },
}

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

const Settings = styled(Link)`
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 1rem;
    border-bottom: none;
    font-size: 1.3rem;
`

const NavDrawer = () => {
    const [isOpen, setOpen] = useState(false)
    const hasDevices = useSelector(selectHasDevices)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDevices())
    }, [])

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
            <Trigger onClick={toggleOpen}>Menu</Trigger>
            <Drawer isOpen={isOpen}>
                <Dismiss onClick={toggleOpen}>✕</Dismiss>
                {
                    Object.entries(pages).map(([k, p]) => <Link key={k} onClick={toggleOpen} href={`#${p.path}`}>{p.display}</Link>)
                }
                <Settings onClick={toggleOpen} href="#/settings">{ emoji.gear }</Settings>
            </Drawer>
        </div>
    )
}

export default NavDrawer
