import type { LAYER_MAPPING } from '../types/layer'

const LAYERS: LAYER_MAPPING = {
    radar: {
        url: 'https://nowcoast.noaa.gov/arcgis/services/nowcoast/radar_meteo_imagery_nexrad_time/MapServer/WMSServer',
        service: 'radar_meteo_imagery_nexrad_time',
        layers: [
            {
                id: '1',
                name: 'Radar'
            }
        ],
        name: 'Radar',
        id: 'radar'
    },
    satellite: {
        url: 'https://nowcoast.noaa.gov/arcgis/services/nowcoast/sat_meteo_imagery_time/MapServer/WMSServer',
        service: 'sat_meteo_imagery_time',
        layers: [
            {
                name: 'Global SWIR',
                id: '1'
            },
            {
                name: 'Global LWIR',
                id: '5'
            },
            {
                name: 'Global V',
                id: '9'
            },
            {
                name: 'GOES SWIR',
                id: '13'
            },
            {
                name: 'GOES LWIR',
                id: '17'
            },
            {
                name: 'GOES V',
                id: '25'
            },
        ],
        name: 'Satellite',
        id: 'satellite'
    },
    rtma: {
        url: 'https://nowcoast.noaa.gov/arcgis/services/nowcoast/analysis_meteohydro_sfc_rtma_time/MapServer/WMSServer',
        service: 'analysis_meteohydro_sfc_rtma_time',
        layers: [
            {
                name: 'Temperature',
                id: '17'
            },
            {
                name: 'Wind Speed',
                id: '9'
            },
            {
                name: 'Wind Gusts',
                id: '5'
            },
            {
                name: 'Dew Point',
                id: '13'
            },
            {
                name: 'Precip',
                id: '21'
            },
        ],
        name: 'Current',
        id: 'rtma'
    },
    forecast: {
        url: 'https://nowcoast.noaa.gov/arcgis/services/nowcoast/forecast_meteoceanhydro_sfc_ndfd_time/MapServer/WMSServer',
        service: 'forecast_meteoceanhydro_sfc_ndfd_time',
        layers: [
            {
                name: 'Temperature',
                id: '25'
            },
            {
                name: 'Feels Like',
                id: '17'
            },
            {
                name: 'Dew Point',
                id: '21'
            },
            {
                name: 'Humidity',
                id: '13'
            },
            {
                name: 'Chance Precip',
                id: '33'
            },
            {
                name: 'Wind Speed',
                id: '9'
            },
            {
                name: 'Wind Gusts',
                id: '5'
            },
        ],
        name: 'Forecast',
        id: 'forecast',
    },
    // lightning: {
    //     url: 'https://nowcoast.noaa.gov/arcgis/services/nowcoast/sat_meteo_emulated_imagery_lightningstrikedensity_goes_time/MapServer/WMSServer',
    // service: 'sat_meteo_emulated_imagery_lightningstrikedensity_goes_time',
    //     layers: '1',
    //     name: 'Lightning',
    //     id: 'lightning'
    // },
    severe: {
        url: 'https://nowcoast.noaa.gov/arcgis/services/nowcoast/guidance_natlcenters_meteoceanhydro_outlooks_time/MapServer/WMSServer',
        service: 'guidance_natlcenters_meteoceanhydro_outlooks_time',
        layers: [
            {
                id: '9',
                name: 'Severe Outlook'
            }
        ],
        name: 'Severe Outlook',
        id: 'severe'
    }
}

export default LAYERS
