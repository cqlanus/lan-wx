import type { LAYER_MAPPING } from '../types/layer'

const LAYERS: LAYER_MAPPING = {
    radar: {
        url: 'https://nowcoast.noaa.gov/arcgis/services/nowcoast/radar_meteo_imagery_nexrad_time/MapServer/WMSServer',
        service: 'radar_meteo_imagery_nexrad_time',
        layers: [
            {
                id: '1',
                arcgisId: '3',
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
                arcgisId: '11',
                id: '17'
            },
            {
                name: 'Wind Speed',
                id: '9',
                arcgisId: '19',
            },
            {
                name: 'Dew Point',
                arcgisId: '15',
                id: '13'
            },
            {
                name: 'Precip',
                arcgisId: '7',
                id: '21'
            },
            {
                name: 'Wind Velo',
                arcgisId: '3',
                id: '25'
            },
            {
                name: 'Visibility',
                arcgisId: '27',
                id: '1'
            }
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
                arcgisId: '31',
                id: '25'
            },
            {
                name: 'Feels Like',
                arcgisId: '39',
                id: '17'
            },
            {
                name: 'Dew Point',
                arcgisId: '35',
                id: '21'
            },
            {
                name: 'Humidity',
                arcgisId: '43',
                id: '13'
            },
            {
                name: 'Chance Precip',
                arcgisId: '23',
                id: '33'
            },
            {
                name: 'Wind Speed',
                arcgisId: '47',
                id: '9'
            },
            {
                name: 'Wind Gusts',
                arcgisId: '51',
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
                arcgisId: '3',
                name: 'Severe Outlook'
            }
        ],
        name: 'Severe Outlook',
        id: 'severe'
    }
}

export default LAYERS
