import { utcToZonedTime, format } from 'date-fns-tz'
import { AstroDuration } from '../types/astronomy'

export const localFormattedTime = (date: Date) => {
    const tz = 'America/Chicago'
    const localDate = utcToZonedTime(date, tz)
    return format(localDate, 'HH:mm')
}

export const localFormattedDate = (date: Date) => {
    const tz = 'America/Chicago'
    const localDate = utcToZonedTime(date, tz)
    return format(localDate, 'MM/dd')
}

const twoDigitTimeNumber = (num: number) => {
    return `${num}`.length === 1 ? `0${num}` : `${num}`
}

export const formatDuration = ({ hours, minutes, seconds }: AstroDuration) => {
    return `${twoDigitTimeNumber(hours)}:${twoDigitTimeNumber(minutes)}:${twoDigitTimeNumber(seconds)}`
}

export const formatTimeCompare = ({ compared, title, ...comp }: AstroDuration & { title: string }) => {
    const time = Object.entries(comp).reduce((acc: string, entry) => {
        const [unit, val] = entry
        if (val === 0) { return acc }
        const unitStr = val === 1 ? unit.slice(0, -1) : unit
        if (acc === '') { return `${val} ${unitStr}` }
        return `${acc} ${val} ${unitStr}`
    }, '')
    return `${time} ${compared} than ${title}`
}
