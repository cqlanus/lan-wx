import CONFIG from './config/vars'

export const getConfigVar = (configVar: string) => {
    const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev'
    return CONFIG[env][configVar]
}
