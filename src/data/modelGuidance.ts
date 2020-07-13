export type ModelProduct = {
    name: string,
    interval: number,
    max: number,
    start: number,
    key: string,
}
type ModelDescription = {
    name: string,
    products: {
        [key: string]: ModelProduct
    }
}
type ModelGuidance = {
    gfs: ModelDescription,
    nam: ModelDescription,
    hrrr: ModelDescription,
}
const MODEL_GUIDANCE: ModelGuidance = {
    gfs: {
        name: 'GFS',
        products: {
            precip_p01: {
                name: 'Hourly Accumulated Precipitation',
                interval: 1,
                max: 120,
                start: 1,
                key: 'precip_p01',
            },
            precip_ptot: {
                name: 'Precipitation Total',
                interval: 3,
                max: 240,
                start: 3,
                key: 'precip_ptot'
            },
            sim_radar_comp: {
                name: 'Simulated Radar Reflectivity',
                interval: 1,
                max: 120,
                start: 1,
                key: 'sim_radar_comp'
            },
            '850_temp_mslp_precip': {
                name: '850mb Temperature, Pressure & Precip',
                interval: 1,
                max: 120,
                start: 1,
                key: '850_temp_mslp_precip'
            },
            '10m_wnd_precip': {
                name: '10 Meter Wind & Precip',
                interval: 1,
                max: 120,
                start: 1,
                key: '10m_wnd_precip'
            },
            '10m_wnd_2m_temp': {
                name: '10 Meter Wind & Temp',
                interval: 1,
                max: 120,
                start: 1,
                key: '10m_wnd_2m_temp'
            },
            '200_wnd_ht': {
                name: '200mb Wind, Height & Isopleths',
                interval: 1,
                max: 120,
                start: 1,
                key: '200_wnd_ht'
            },
            '300_wnd_ht': {
                name: '300mb Wind, Height & Isopleths',
                interval: 1,
                max: 120,
                start: 1,
                key: '300_wnd_ht'
            },
            '500_wnd_ht': {
                name: '500mb Wind, Height & Isopleths',
                interval: 1,
                max: 120,
                start: 1,
                key: '500_wnd_ht'
            },
            '500_rh_ht': {
                name: '500mb Relative Humidity & Height',
                interval: 1,
                max: 120,
                start: 1,
                key: '500_rh_ht'
            },
            '700_rh_ht': {
                name: '700mb Relative Humidity & Height',
                interval: 1,
                max: 120,
                start: 1,
                key: '700_rh_ht'
            },
            '850_rh_ht': {
                name: '850mb Relative Humidity & Height',
                interval: 1,
                max: 120,
                start: 1,
                key: '850_rh_ht'
            },
            '850_pw_ht': {
                name: '850mb Precipitable Water & Height',
                interval: 1,
                max: 120,
                start: 1,
                key: '850_pw_ht'
            },
            '850_temp_ht': {
                name: '850mb Temperature & Height',
                interval: 1,
                max: 120,
                start: 1,
                key: '850_temp_ht'
            },
            '925_temp_ht': {
                name: '925mb Temperature & Height',
                interval: 1,
                max: 120,
                start: 1,
                key: '925_temp_ht'
            },
        }
    },
    nam: {
        name: 'NAM',
        products: {
            precip_p01: {
                name: 'Hourly Accumulated Precipitation',
                interval: 1,
                max: 36,
                start: 1,
                key: 'precip_p01'
            },
            precip_ptot: {
                name: 'Precipitation Total',
                interval: 3,
                max: 84,
                start: 3,
                key: 'precip_ptot'
            },
            sim_radar_1km: {
                name: 'Simulated Radar Reflectivity',
                interval: 1,
                max: 36,
                start: 1,
                key: 'sim_radar_1km'
            },
            '850_temp_mslp_precip': {
                name: '850mb Temperature, Pressure & Precip',
                interval: 3,
                max: 84,
                start: 3,
                key: '850_temp_mslp_precip'
            },
            '10m_wnd_precip': {
                name: '10 Meter Wind & Precip',
                interval: 3,
                max: 84,
                start: 3,
                key: '10m_wnd_precip'
            },
            '10m_wnd_2m_temp': {
                name: '10 Meter Wind & Temp',
                interval: 3,
                max: 84,
                start: 3,
                key: '10m_wnd_2m_temp'
            },
            '200_wnd_ht': {
                name: '200mb Wind, Height & Isopleths',
                interval: 3,
                max: 84,
                start: 3,
                key: '200_wnd_ht'
            },
            '300_wnd_ht': {
                name: '300mb Wind, Height & Isopleths',
                interval: 3,
                max: 84,
                start: 3,
                key: '300_wnd_ht'
            },
            '500_wnd_ht': {
                name: '500mb Wind, Height & Isopleths',
                interval: 3,
                max: 84,
                start: 3,
                key: '500_wnd_ht'
            },
            '500_rh_ht': {
                name: '500mb Relative Humidity & Height',
                interval: 3,
                max: 84,
                start: 3,
                key: '500_rh_ht'
            },
            '700_rh_ht': {
                name: '700mb Relative Humidity & Height',
                interval: 3,
                max: 84,
                start: 3,
                key: '700_rh_ht'
            },
            '850_rh_ht': {
                name: '850mb Relative Humidity & Height',
                interval: 3,
                max: 84,
                start: 3,
                key: '850_rh_ht'
            },
            '850_pw_ht': {
                name: '850mb Precipitable Water & Height',
                interval: 3,
                max: 84,
                start: 3,
                key: '850_pw_ht'
            },
            '850_temp_ht': {
                name: '850mb Temperature & Height',
                interval: 3,
                max: 84,
                start: 3,
                key: '850_temp_ht'
            },
            '925_temp_ht': {
                name: '925mb Temperature & Height',
                interval: 3,
                max: 84,
                start: 3,
                key: '925_temp_ht'
            },
        }
    },
    hrrr: {
        name: 'HRRR',
        products: {
            precip_p01: {
                name: 'Hourly Accumulated Precipitation',
                interval: 1,
                max: 11,
                start: 1,
                key: 'precip_p01'
            },
            precip_ptot: {
                name: 'Precipitation Total',
                interval: 1,
                max: 11,
                start: 1,
                key: 'precip_ptot'
            },
            precip_rate: {
                name: 'Precipitation Rate',
                interval: 1,
                max: 11,
                start: 1,
                key: 'precip_rate'
            },
            sim_radar_1km: {
                name: 'Simulated Radar Reflectivity',
                interval: 1,
                max: 12,
                start: 1,
                key: 'sim_radar_1km'
            },
            sim_radar_comp: {
                name: 'Simulated Radar Reflectivity (Comp)',
                interval: 1,
                max: 12,
                start: 1,
                key: 'sim_radar_comp'
            },
            sfc_cape_cin: {
                name: 'Surface CAPE/CIN',
                interval: 1,
                max: 13,
                start: 1,
                key: 'sfc_cape_cin'
            },
            ceiling: {
                name: 'Cloud Ceiling',
                interval: 1,
                max: 13,
                start: 1,
                key: 'ceiling'
            },
        }
    }

}

export default MODEL_GUIDANCE
