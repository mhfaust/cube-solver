import { zNeg } from '../layerRotations'
import { CubeFaces } from '../newCube'

const zNeg0 = zNeg(0)
const zNeg1 = zNeg(1)
const zNeg2 = zNeg(2)

const zzzNeg = (cube: CubeFaces) => {
    return zNeg2(zNeg1(zNeg0(cube)))
}

export default zzzNeg