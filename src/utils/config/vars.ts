type VAR_CONFIG = {
    local: { [key: string]: string },
    dev: { [key: string]: string },
    prod: { [key: string]: string },
}
const vars: VAR_CONFIG = {
    local: {
        LAN_WX_API: 'https://localhost:9001',
    },
    dev: {
        LAN_WX_API: 'https://lan-wx-api.chrislanus.com',
        // LAN_WX_API: '',
    },
    prod: {
        LAN_WX_API: 'https://lan-wx-api.chrislanus.com',
        // LAN_WX_API: 'https://localhost:9001'
    }
}

export default vars
