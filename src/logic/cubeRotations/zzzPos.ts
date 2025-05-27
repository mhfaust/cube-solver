import { zPos } from '../layerRotations/zPos'
import { CubeFaces } from '../newCube'

const zPos0 = zPos(0)
const zPos1 = zPos(1)
const zPos2 = zPos(2)

export const zzzPos = (cube: CubeFaces) => {
    return zPos2(zPos1(zPos0(cube)))
}
