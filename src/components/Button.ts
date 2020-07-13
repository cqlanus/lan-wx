import styled, { css } from 'styled-components'
import getTheme from '../themes'

export const buttonStyle = css`
    font-family: monospace;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    background-color: ${() => getTheme().bg};
    border: 1px dashed ${() => getTheme().fg};
    cursor: pointer;
    border-radius: 0;
    color: ${() => getTheme().fg};
    text-decoration: none;

    &:hover {
      font-weight: bold;
    }
`

const Button = styled.button`
    ${buttonStyle}
`
export default Button
