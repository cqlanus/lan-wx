export type SetRise = {
    set: string,
    rise: string,
    culm: {
        time: string,
        coords: {
            azimuth: number,
            altitude: number,
            ra: number,
            dec: number
        }
    }
}

export type BodyPosition = {
    ra: number,
    dec: number,
    alt: number,
    az: number
}

export type BodyTimes = {
    [key: string]: SetRise
}

export type BodyPositions = {
    [key: string]: BodyPosition
} & { date: string }
