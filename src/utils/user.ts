export const isStationFavorited = (icao: string, user: any): boolean => {
    const { stations = [] } = user
    return stations.some((station: any) => station.id === icao)
}
