import { yNeg } from '../layerRotations/yNeg'
import { CubeFaces } from '../newCube'

const yNeg0 = yNeg(0)
const yNeg1 = yNeg(1)
const yNeg2 = yNeg(2)

export const yyyNeg = (cube: CubeFaces) => {
    return yNeg2(yNeg1(yNeg0(cube)))
}
