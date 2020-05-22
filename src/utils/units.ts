import * as math from 'mathjs'

math.createUnit('mb', '0.001 bar')

export const convertUnits = (fromUnit: string, toUnit: string, value: number) => {
    const unit = math.unit(value, fromUnit)
    return unit.to(toUnit)
}
