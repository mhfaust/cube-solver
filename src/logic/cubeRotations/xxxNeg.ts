import { xNeg } from '../layerRotations'
import { Cube } from '../newCube'

const xNeg0 = xNeg(0)
const xNeg1 = xNeg(1)
const xNeg2 = xNeg(2)

const xxxNeg = (cube: Cube) => {
    return xNeg2(xNeg1(xNeg0(cube)))
}

export default xxxNeg