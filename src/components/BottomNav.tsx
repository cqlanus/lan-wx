import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import Button from './Button'
import getTheme from '../themes'

const BottomContainer = styled.div`
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
`

const ButtonGroup = styled.div`
    display: flex;
`

type BottomNavButtonProps = { selected: boolean }
const BottomNavButton = styled(Button)`
    color: ${() => getTheme().fg};
    text-decoration: none;
    flex: 1;
    font-weight: ${(p: BottomNavButtonProps) => p.selected ? 'bold' : 'normal'};

    &:visited {
         color: ${() => getTheme().fg};
    }
`

// needs object of { key: { display: '' } }
type Options = {
    options: { [key: string]: { display: string } },
    selected: (key: string) => boolean,
    root: string,
    children?: any
}
const BottomNav = ({ options, selected, root, children }: Options) => {

    return (
        <BottomContainer>
            {children}
            <ButtonGroup>
                {
                    Object.entries(options).map((entry) => {
                        const [k, chType]: any = entry
                        return (
                            <BottomNavButton as={Link} to={`/${root}/${k}`} selected={selected(k)} key={k}>
                                {chType.display}
                            </BottomNavButton>
                        )
                    })
                }
            </ButtonGroup>
        </BottomContainer>
    )
}

export default BottomNav
