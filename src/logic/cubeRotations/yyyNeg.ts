import { yNeg } from '../layerRotations/yNeg'
import { CubeFaces } from '../newCube'

const yNeg0 = yNeg(0)
const yNeg1 = yNeg(1)
const yNeg2 = yNeg(2)

/**
 * Rotates the entire cube around the Y axis in negative direction.
 *
 * @param cube - Cube state to rotate.
 */
export const yyyNeg = (cube: CubeFaces) => {
    return yNeg2(yNeg1(yNeg0(cube)))
}
