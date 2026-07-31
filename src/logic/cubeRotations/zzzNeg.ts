import { zNeg } from '../layerRotations/zNeg'
import { CubeFaces } from '../newCube'

const zNeg0 = zNeg(0)
const zNeg1 = zNeg(1)
const zNeg2 = zNeg(2)

/**
 * Rotates the entire cube around the Z axis in negative direction.
 *
 * @param cube - Cube state to rotate.
 */
export const zzzNeg = (cube: CubeFaces) => {
    return zNeg2(zNeg1(zNeg0(cube)))
}
