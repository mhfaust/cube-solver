import { zPos } from '../layerRotations'
import { Cube } from '../newCube'

const zPos0 = zPos(0)
const zPos1 = zPos(1)
const zPos2 = zPos(2)

const zzzPos = (cube: Cube) => {
    return zPos2(zPos1(zPos0(cube)))
}

export default zzzPos