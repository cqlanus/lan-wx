import styled from 'styled-components'
import getTheme from '../themes'


type Props = {
    vertical?: boolean
}
const renderFlex = (p: Props) => {
    if (p.vertical) {
        return `
            padding: 1rem 0;
        `
    }
    return `
        display: flex;
        justify-content: space-around;
        text-align: left;
        padding: 1rem;
    `
}
const OptionContainer = styled.div`
    border: 1px dashed ${() => getTheme().fg};
    border-bottom: none;
    background-color: ${() => getTheme().bg};
    ${renderFlex}
`

export default OptionContainer
