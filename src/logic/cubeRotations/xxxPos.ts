import { xPos } from '../layerRotations/xPos'
import { CubeFaces } from '../newCube'

const xPos0 = xPos(0)
const xPos1 = xPos(1)
const xPos2 = xPos(2)

export const xxxPos = (cube: CubeFaces) => {
    return xPos2(xPos1(xPos0(cube)))
}
