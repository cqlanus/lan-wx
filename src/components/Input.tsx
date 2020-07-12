import styled from 'styled-components'
import getTheme from '../themes'

const Input = styled.input`
    flex: 1;
    font-family: monospace;
    font-size: 1rem;
    padding: 0 0.5rem;
    border: none;
    border-bottom: 1px dashed ${() => getTheme().fg};
    outline: none;
    background-color: ${() => getTheme().bg};
    color: ${() => getTheme().fg};
`

export default Input
