import { yNeg } from '../layerRotations'
import { Cube } from '../newCube'

const yNeg0 = yNeg(0)
const yNeg1 = yNeg(1)
const yNeg2 = yNeg(2)

const yyyNeg = (cube: Cube) => {
    return yNeg2(yNeg1(yNeg0(cube)))
}

export default yyyNeg