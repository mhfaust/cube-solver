import { xPos } from '../layerRotations'
import { CubeFaces } from '../newCube'

const xPos0 = xPos(0)
const xPos1 = xPos(1)
const xPos2 = xPos(2)

const xxxPos = (cube: CubeFaces) => {
    return xPos2(xPos1(xPos0(cube)))
}

export default xxxPos