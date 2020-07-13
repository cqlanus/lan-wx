import { createGlobalStyle } from 'styled-components'
import type { Theme } from '../types/theme'
type Props = {
    theme: Theme
}

export default createGlobalStyle`
    html {
        background: ${({ theme }: Props) => theme.body};
    }
    body {
        text-align: center;
        font-family: monospace;
        font-size: 16px;
        padding: env(safe-area-inset-bottom, 50px);
        background: ${({ theme }: Props) => theme.body};
        color: ${({ theme }: Props) => theme.text};
    }
`
