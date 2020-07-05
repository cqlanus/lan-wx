import styled from 'styled-components'


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
    border: 1px dashed black;
    border-bottom: none;
    background-color: white;
    ${renderFlex}
`

export default OptionContainer
