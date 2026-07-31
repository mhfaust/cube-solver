import { yPos } from '../layerRotations/yPos'
import { CubeFaces } from '../newCube'

const yPos0 = yPos(0)
const yPos1 = yPos(1)
const yPos2 = yPos(2)

/**
 * Rotates the entire cube around the Y axis in positive direction.
 *
 * @param cube - Cube state to rotate.
 */
export const yyyPos = (cube: CubeFaces) => {
    return yPos2(yPos1(yPos0(cube)))
}
