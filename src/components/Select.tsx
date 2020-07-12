import styled from 'styled-components'
import getTheme from '../themes'

const Select = styled.select`
    width: 100%;
    font-size: 1rem;
    font-family: monospace;
    border: none;
    text-align: center;
    background-color: ${() => getTheme().bg};
    color: ${() => getTheme().fg};
`
export default Select
