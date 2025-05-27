import { xxxNeg } from '../cubeRotations/xxxNeg'
import { xxxPos } from '../cubeRotations/xxxPos'
import { yyyNeg } from '../cubeRotations/yyyNeg'
import { yyyPos } from '../cubeRotations/yyyPos'
import { zzzNeg } from '../cubeRotations/zzzNeg'
import { zzzPos } from '../cubeRotations/zzzPos'
import { U, Ui, D, Di, L, Li, R, Ri, B, Bi, F, Fi } from '../layerRotations/advancedNotation'




export const keyTransforms = () => ({
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
    '0': xxxNeg,
    ')': xxxPos,
    '-': yyyPos,
    '_': yyyNeg,
    '=': zzzPos,
    '+': zzzNeg
})