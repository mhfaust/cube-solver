import { xNeg } from '../layerRotations/xNeg'
import { CubeFaces } from '../newCube'

const xNeg0 = xNeg(0)
const xNeg1 = xNeg(1)
const xNeg2 = xNeg(2)

/**
 * Rotates the entire cube around the X axis in negative direction.
 *
 * @param cube - Cube state to rotate.
 */
export const xxxNeg = (cube: CubeFaces) => {
    return xNeg2(xNeg1(xNeg0(cube)))
}
