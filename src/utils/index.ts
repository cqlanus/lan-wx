import CONFIG from './config/vars'

export const getConfigVar = (configVar: string) => {
    const { NODE_ENV, REACT_APP_LOCAL } = process.env
    const env = NODE_ENV === 'production' ? 'prod' 
        : REACT_APP_LOCAL ? 'local'
        : 'dev'
    return CONFIG[env][configVar]
}
