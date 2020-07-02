const MODEL_GUIDANCE = {
    gfs: {
        name: 'GFS',
        products: {
            precip_p01: 'Hourly Accumulated Precipitation',
            sim_radar_comp: 'Simulated Radar Reflectivity',
            '850_temp_mslp_precip': '850mb Temperature, Pressure & Precip',
            '10m_wnd_precip': '10 Meter Wind & Precip',
            '10m_wnd_2m_temp': '10 Meter Wind & Temp',
            '200_wnd_ht': '200mb Wind, Height & Isopleths',
            '300_wnd_ht': '300mb Wind, Height & Isopleths',
            '500_wnd_ht': '500mb Wind, Height & Isopleths',
            '500_rh_ht': '500mb Relative Humidity & Height',
            '700_rh_ht': '700mb Relative Humidity & Height',
            '850_rh_ht': '850mb Relative Humidity & Height',
            '850_pw_ht': '850mb Precipitable Water & Height',
            '850_temp_ht': '850mb Temperature & Height',
            '925_temp_ht': '925mb Temperature & Height',
        }
    },
    nam: {
        name: 'NAM',
        products: {
            precip_p01: 'Hourly Accumulated Precipitation',
            sim_radar_1km: 'Simulated Radar Reflectivity',
            '850_temp_mslp_precip': '850mb Temperature, Pressure & Precip',
            '10m_wnd_precip': '10 Meter Wind & Precip',
            '10m_wnd_2m_temp': '10 Meter Wind & Temp',
            '200_wnd_ht': '200mb Wind, Height & Isopleths',
            '300_wnd_ht': '300mb Wind, Height & Isopleths',
            '500_wnd_ht': '500mb Wind, Height & Isopleths',
            '500_rh_ht': '500mb Relative Humidity & Height',
            '700_rh_ht': '700mb Relative Humidity & Height',
            '850_rh_ht': '850mb Relative Humidity & Height',
            '850_pw_ht': '850mb Precipitable Water & Height',
            '850_temp_ht': '850mb Temperature & Height',
            '925_temp_ht': '925mb Temperature & Height',
        }
    },
    hrrr: {
        name: 'HRRR',
        products: {
            precip_p01: 'Hourly Accumulated Precipitation',
            sim_radar_comp: 'Simulated Radar Reflectivity',
            sfc_cape_cin: 'Surface CAPE/CIN',
            ceiling: 'Cloud Ceiling',
        }
    }

}

export default MODEL_GUIDANCE
