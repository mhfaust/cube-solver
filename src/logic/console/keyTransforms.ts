import { U, Ui, D, Di, L, Li, R, Ri, B, Bi, F, Fi } from '../layerRotations/advancedNotation'

import {
    xxxNeg,
    xxxPos,
    yyyPos,
    yyyNeg,
    zzzPos,
    zzzNeg,
} from '../cubeRotations'


export default  (cubeSize) => ({
    u: U,
    U: Ui,
    d: D,
    D: Di,
    l: L,
    L: Li,
    r: R,
    R: Ri,
    b: B,
    B: Bi,
    f: F,
    F: Fi,
    '0': xxxNeg(cubeSize),
    ')': xxxPos(cubeSize),
    '-': yyyPos(cubeSize),
    '_': yyyNeg(cubeSize),
    '=': zzzPos(cubeSize),
    '+': zzzNeg(cubeSize)
})