import { xNeg } from '../layerRotations/xNeg'
import { CubeFaces } from '../newCube'

const xNeg0 = xNeg(0)
const xNeg1 = xNeg(1)
const xNeg2 = xNeg(2)

export const xxxNeg = (cube: CubeFaces) => {
    return xNeg2(xNeg1(xNeg0(cube)))
}
