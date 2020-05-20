type VAR_CONFIG = {
    dev: { [key: string]: string },
    prod: { [key: string]: string },
}
const vars: VAR_CONFIG = {
    dev: {
        LAN_WX_API: 'https://localhost:9001',
    },
    prod: {
        LAN_WX_API: 'https://localhost:9001'
    }
}

export default vars
