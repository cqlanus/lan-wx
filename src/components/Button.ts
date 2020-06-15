import styled, { css } from 'styled-components'

export const buttonStyle = css`
    font-family: monospace;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    background-color: white;
    border: 1px dashed black;
    cursor: pointer;

    &:hover {
      font-weight: bold;
    }
`

const Button = styled.button`
    ${buttonStyle}
`
export default Button
