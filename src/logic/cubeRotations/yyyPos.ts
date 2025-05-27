import { yPos } from '../layerRotations'
import { CubeFaces } from '../newCube'

const yPos0 = yPos(0)
const yPos1 = yPos(1)
const yPos2 = yPos(2)

const yyyPos = (cube: CubeFaces) => {
    return yPos2(yPos1(yPos0(cube)))
}

export default yyyPos